import { getLibs } from '../../../scripts/utils.js';

const { loadScript, loadStyle } = await import(`${getLibs()}/utils/utils.js`);

export default async function init(el, suppliedData) {
  const data = suppliedData || [[]];
  await loadStyle('/deps/jspreadsheet-ce/dist/jspreadsheet.css');
  await loadScript('/deps/jspreadsheet-ce/dist/index.js');
  await loadScript('/deps/jsuites/dist/jsuites.js');

  const config = {
    data,
    minSpareCols: 20,
    minSpareRows: 20,
  };

  if (data?.length > 0) {
    // A very minimal column config to set widths if there's data.
    // Not clever enough to detect how wide a column should be.
    config.columns = data[0].map(() => ({ width: '200px' }));
  }

  return window.jspreadsheet(el, config);
}
