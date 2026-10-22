import fs from 'fs';
import path from 'path';

const pages = [
  'Home', 'Shop', 'ProductDetails', 'Collections', 'About', 'Journal',
  'BlogArticle', 'Contact', 'Cart', 'Checkout', 'Wishlist', 'Account',
  'TrackOrder', 'SearchResults', 'NotFound', 'Privacy'
];

const basePath = '/home/azizbek/zar_shop/lumiere/src/pages';

pages.forEach(page => {
  const pageDir = path.join(basePath, page);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

  const jsxPath = path.join(pageDir, `${page}.jsx`);
  const jsxContent = `import './${page}.css';

export default function ${page}() {
  return (
    <div className="page-${page.toLowerCase()}">
      <div className="container">
        <h1>${page} Page</h1>
      </div>
    </div>
  );
}
`;
  if (!fs.existsSync(jsxPath)) fs.writeFileSync(jsxPath, jsxContent);

  const cssPath = path.join(pageDir, `${page}.css`);
  const cssContent = `.page-${page.toLowerCase()} {\n  padding: var(--space-4xl) 0;\n}\n`;
  if (!fs.existsSync(cssPath)) fs.writeFileSync(cssPath, cssContent);
});
console.log('Pages scaffolded!');
