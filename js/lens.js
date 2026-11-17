// The MacSprint logo mark: the Layered lens, four stacked indigo circles with see-through gaps
// (same geometry as LensMark in the app). Colours come from --l1…--l4 in styles.css.
let n = 0;
export function lensSvg(size = 24, cls = '') {
  const id = 'lm-js' + (++n);
  return `<svg class="lens-mark ${cls}" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true"><mask id="${id}"><rect width="100" height="100" fill="#fff"/><g fill="none" stroke="#000" stroke-width="3.2"><circle cx="51" cy="52" r="26"/><circle cx="47" cy="48" r="19"/><circle cx="44" cy="45" r="12"/></g></mask><g mask="url(#${id})"><circle class="lr" style="--i:0" cx="55" cy="56" r="33" fill="var(--l1)"/><circle class="lr" style="--i:1" cx="51" cy="52" r="26" fill="var(--l2)"/><circle class="lr" style="--i:2" cx="47" cy="48" r="19" fill="var(--l3)"/><circle class="lr" style="--i:3" cx="44" cy="45" r="12" fill="var(--l4)"/></g></svg>`;
}
export const wordmark = (px) => `<span class="wm" style="font-size:${px}px"><span class="wm-m">Mac</span><span class="wm-s">Sprint</span></span>`;
