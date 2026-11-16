// Space Map rings, as the app draws them: the inner ring is this level's folders, the outer ring what is
// inside each. Orange marks what Free Up Space suggests. Purely a picture; the list beside it is the control.
const ORANGE = 'hsl(28 92% 56%)';

const pt = (r, a) => [100 + r * Math.sin(a * 2 * Math.PI), 100 - r * Math.cos(a * 2 * Math.PI)].map((v) => v.toFixed(2)).join(' ');
function arc(r0, r1, a0, a1) {
  const g = Math.min(0.004, (a1 - a0) / 4); a0 += g; a1 -= g;
  const big = a1 - a0 > 0.5 ? 1 : 0;
  return `M${pt(r1, a0)}A${r1} ${r1} 0 ${big} 1 ${pt(r1, a1)}L${pt(r0, a1)}A${r0} ${r0} 0 ${big} 0 ${pt(r0, a0)}Z`;
}

// items: [{ name, gb, h, kids?: [{ gb, free? }], free?, on? }]. Sizes are shares of the sum.
export function ringsSvg(items, { label = '', center } = {}) {
  const total = items.reduce((s, x) => s + x.gb, 0);
  let a = 0, paths = '';
  for (const x of items) {
    const a1 = a + x.gb / total;
    const fill = x.free ? ORANGE : `hsl(${x.h} 62% ${x.on ? 44 : 54}%)`;
    paths += `<path d="${arc(44, 70, a, a1)}" fill="${fill}"${x.on ? ' stroke="var(--text)" stroke-width="2"' : ''}/>`;
    let b = a;
    for (const k of x.kids || []) {
      const b1 = b + k.gb / total;
      paths += `<path d="${arc(73, 92, b, b1)}" fill="${k.free ? ORANGE : `hsl(${x.h} 55% 72%)`}"/>`;
      b = b1;
    }
    a = a1;
  }
  return `<svg class="rings" viewBox="0 0 200 200" role="img" aria-label="${label}">${paths}<text x="100" y="97" text-anchor="middle" class="rings-big">${center || Math.round(total) + ' GB'}</text><text x="100" y="114" text-anchor="middle" class="rings-small">used</text></svg>`;
}
