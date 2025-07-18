'use client';

import { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const DENSITIES = {
    mdpi: 1,
    hdpi: 1.5,
    xhdpi: 2,
    xxhdpi: 3,
    xxxhdpi: 4,
};

export default function AndroidAssetGenerator() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
    const [imageBlobs, setImageBlobs] = useState<Record<string, { blob: Blob; url: string }>>({});
    const [selectedDensities, setSelectedDensities] = useState<Record<string, boolean>>(
        Object.fromEntries(Object.keys(DENSITIES).map((k) => [k, true]))
    );
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    setImageSrc(reader.result as string);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a PNG or JPEG image');
        }
    };

    const toggleDensity = (density: string) => {
        setSelectedDensities((prev) => ({
            ...prev,
            [density]: !prev[density],
        }));
    };


    useEffect(() => {
        const generateImages = () => {
            if (!image || !canvasRef.current) return;
            setLoading(true);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const newBlobs: Record<string, { blob: Blob; url: string }> = {};

            const baseWidth = image.width;
            const baseHeight = image.height;

            const entries = Object.entries(DENSITIES).filter(([density]) => selectedDensities[density]);
            let completed = 0;

            entries.forEach(([density, scale]) => {
                const scaleRatio = scale / DENSITIES.xxxhdpi;
                const width = Math.round(baseWidth * scaleRatio);
                const height = Math.round(baseHeight * scaleRatio);
                canvas.width = width;
                canvas.height = height;
                if (!ctx) return;
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        newBlobs[density] = { blob, url };
                    }
                    completed++;
                    if (completed === entries.length) {
                        setImageBlobs(newBlobs);
                        setLoading(false);
                    }
                }, `image/${format}`);
            });
        };

        generateImages();
    }, [image, format, selectedDensities]);

    const handleDownloadAll = async () => {
        const zip = new JSZip();
        await Promise.all(
            Object.entries(imageBlobs).map(async ([density, { blob }]) => {
                zip.file(`drawable-${density}/asset.${format}`, blob);
            })
        );
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'android-assets.zip');
    };

    return (
        <Card className="relative flex flex-col items-center w-full max-w-4xl p-6 overflow-hidden">
            <CardHeader className="w-full">
                <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Android Asset Generator</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
                <div
                    className={`w-full h-40 border-2 border-dashed ${dragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                        } rounded-md flex items-center justify-center text-gray-600 cursor-pointer mb-4`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        if (e.dataTransfer.files?.length) {
                            const file = e.dataTransfer.files[0];
                            const event = {
                                target: { files: [file] },
                                preventDefault: () => { },
                            } as unknown as React.ChangeEvent<HTMLInputElement>;
                            handleFileChange(event);
                        }
                    }}
                    onClick={() => document.getElementById('asset-upload')?.click()}
                >
                    <p>{imageSrc ? '✔ File loaded' : 'Drag & drop image here or click to upload (PNG, JPEG)'}</p>
                </div>

                <Input
                    id="asset-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex flex-wrap gap-4 mb-4 w-full justify-center">
                    {Object.keys(DENSITIES).map((density) => (
                        <div key={density} className="flex items-center space-x-2">
                            <Checkbox
                                id={`density-${density}`}
                                checked={selectedDensities[density]}
                                onCheckedChange={() => toggleDensity(density)}
                            />
                            <Label htmlFor={`density-${density}`}>{`drawable-${density}`}</Label>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <Label htmlFor="format-select">Output Format:</Label>
                    <Select
                        value={format}
                        onValueChange={(value) => setFormat(value as 'png' | 'jpeg' | 'webp')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                            <SelectItem value="webp">WEBP</SelectItem>
                        </SelectContent>
                    </Select>
                    {Object.keys(imageBlobs).length > 0 && (
                        <Button
                            onClick={handleDownloadAll}
                            title="Download All"
                        >
                            <FaDownload className="mr-2" /> Download All
                        </Button>
                    )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                {/* Image Previews */}
                <div className="flex flex-col w-full mt-6 space-y-4">
                    {Object.entries(DENSITIES).map(([density]) => {
                        const info = imageBlobs[density];
                        const checked = selectedDensities[density];
                        return (
                            <Card
                                key={density}
                                className="flex items-center p-4 gap-4"
                            >
                                <Checkbox
                                    id={`preview-density-${density}`}
                                    checked={checked}
                                    onCheckedChange={() => toggleDensity(density)}
                                />
                                <div className="w-32 h-32 flex items-center justify-center rounded overflow-hidden">
                                    {checked && info?.url ? (
                                        <img
                                            src={info.url}
                                            alt={`drawable-${density}`}
                                            className="object-contain max-h-full max-w-full transition-transform duration-300 ease-in-out scale-100 hover:scale-150"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-400 text-center px-2">
                                            No image generated
                                        </span>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{`drawable-${density}`}</p>
                                    <p className="text-sm text-gray-500">
                                        {checked && info?.blob
                                            ? `${(info.blob.size / 1024).toFixed(1)} KB`
                                            : '0 KB'}
                                    </p>
                                </div>
                                {checked && info?.blob && (
                                    <Button
                                        className="ml-auto"
                                        title="Download"
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = info.url;
                                            link.download = `drawable-${density}/asset.${format}`;
                                            link.click();
                                        }}
                                    >
                                        <FaDownload />
                                    </Button>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </CardContent>
            {loading && (
                <Progress value={loading ? 100 : 0} className="w-full h-1 absolute bottom-0 left-0" />
            )}
        </Card>
    );
}