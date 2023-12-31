import { origin } from '../shared/constants.js';

async function aemPreview(path, api) {
  const [ owner, repo, ...parts] = path.slice(1).split('/');
  const name = parts.pop() || repo || owner;
  parts.push(name.replace('.html', ''));
  const aemUrl = `https://admin.hlx.page/${api}/${owner}/${repo}/main/${parts.join('/')}`;
  const resp = await fetch(aemUrl, { method: 'POST' });
  if (!resp.ok) return;
  return resp.json();
}

export default async function saveToDa({ path, formData, blob, props, preview = false }) {
  const opts = { method: 'PUT' };

  const form = formData || new FormData();
  if (blob || props) {
    if (blob) form.append('data', blob);
    if (props) form.append('props', JSON.stringify(props));
  }
  if ([...form.keys()].length) opts.body = form;

  const daResp = await fetch(`${origin}/source${path}`, opts);
  if (!daResp.ok) return;
  if (!preview) return;
  return aemPreview(path, 'preview');
}
