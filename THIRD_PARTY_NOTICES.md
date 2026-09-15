# Third-party resources

## Human Atlas

`src/pointer-tap.ts` is copied from `app/pointer-tap.ts` at revision `1c38bf35c254a891200d3cedecfd57abebe83d8d` of https://github.com/ashemag/human-atlas. Gesture test cases are adapted from its interaction validation. The studio typography, palette, floating-panel treatments and layout CSS are adapted from its app/globals.css; c13repo/human-atlas points to the same audited revision. No anatomy assets are used.

MIT License

Copyright (c) 2026 ashemag

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Runtime resource inventory

- System font stack: Inter when installed, then platform sans-serif fonts. No external font request or bundled font file.
- React, React DOM, Three.js: npm dependencies bundled by Vite; exact versions recorded in package-lock.json. Preserve distributed license notices.
- Vite, TypeScript and type declarations: development dependencies recorded in package-lock.json.
