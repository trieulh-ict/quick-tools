# Quick Tools

A collection of handy web-based tools for developers, built with [Next.js](https://nextjs.org) and deployed on GitHub Pages.

## Features

- **Color Converter**: Convert between HEX and ARGB color formats.
- **JSON Formatter**: Format, validate JSON, and convert between JSON and other formats.
- **Image Base64 Tool**: Convert images to Base64 and vice versa.
- **Base64 Decoder & Encoder**: Encode and decode Base64 strings.
- **Time Converter**: Convert between Unix Timestamp, ISO Date, and Local Time.
- **Markdown Editor**: Live preview markdown text formatting.
- **PlantUML Visualizer**: Convert PlantUML code into diagrams.

## Live Demo

Visit [Quick Tools](https://trieulh-ict.github.io/quick-tools/) to try it out!

## Development

1. Clone the repository:
```bash
git clone https://github.com/trieulh-ict/quick-tools.git
cd quick-tools
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000/quick-tools](http://localhost:3000/quick-tools) to see the result.

## Deployment

The project is configured for GitHub Pages deployment. To deploy:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Recent Updates

- Upgraded to Next.js 15.2.2
- Addressed ESLint warnings related to image optimization in ImageBase64Tool and PlantUMLVisualizer components
- Fixed linting issues in ColorConverter and JsonFormatter components
- Improved image handling in ImageBase64Tool
- Optimized performance with React hooks (useCallback)

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [TypeScript](https://www.typescriptlang.org/) - For type safety

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
