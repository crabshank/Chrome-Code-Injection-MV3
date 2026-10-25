var LZString=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i}();

'use strict';

const statusElement = document.getElementById('stats');
const saveButton = document.getElementById('save');
const importButton = document.getElementById('import');
const exportButton = document.getElementById('export');

const fileReader = new FileReader();

let statusTimer = 0;

function setStatus(message) {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;

  clearTimeout(statusTimer);

  statusTimer = setTimeout(() => {
    statusElement.textContent = '';
  }, 1250);
}

function getAdjCurrDateTimeOffset(outISO, ignoreTimeZones, offset = 0) {
  const now = new Date();
  const tzOffset =
    typeof ignoreTimeZones === 'undefined' || !ignoreTimeZones
      ? now.getTimezoneOffset() * 60000
      : 0;

  const t = now.getTime() - tzOffset + offset;

  if (outISO) {
    return new Date(t).toISOString();
  }

  return t;
}

function parseStoredList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setHeights(section) {
  section.querySelectorAll('textarea').forEach(textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 3}px`;
  });
}

function sectionValues(section) {
  const textareas = section.querySelectorAll('textarea');

  return {
    url: textareas[0]?.value.trim() ?? '',
    css: textareas[1]?.value.trim() ?? '',
    js: textareas[2]?.value.trim() ?? ''
  };
}

function isSectionEmpty(section) {
  const values = sectionValues(section);
  return values.url === '' && values.css === '' && values.js === '';
}

function sectionHasRule(section) {
  const values = sectionValues(section);
  return values.url !== '' && (values.css !== '' || values.js !== '');
}

function createSection(values = ['', '', '']) {
  const section = document.createElement('section');
  section.className = 'site_sets';
  section.style.cssText = 'display: inline !important;';

  section.innerHTML = `
    <textarea
      placeholder="URL (Use asterisks with slashes)"
      style="box-shadow: 0 0 0px 1px black; border-width: 0px; width:32.5%;"
    ></textarea>
    <textarea
      placeholder="CSS"
      style="box-shadow: black 0px 0px 0px 1px; border-width: 0px; width: 32.5%; margin-left: 0.16%;"
    ></textarea>
    <textarea
      placeholder="()=>{ //ONLY WRITE FUNCTION BODY IN THIS TEXT BOX!
}"
      style="box-shadow: black 0px 0px 0px 1px; border-width: 0px; width: 32.5%; margin-left: 0.16%;"
    ></textarea>
    <br><br>
  `;

  const textareas = section.querySelectorAll('textarea');

  textareas[0].value = values[0] ?? '';
  textareas[1].value = values[1] ?? '';
  textareas[2].value = values[2] ?? '';

  section.addEventListener('input', () => {
    setHeights(section);
    ensureSectionBehaviour(section);
  });

  return section;
}

function ensureTrailingEmptySection() {
  const sections = [...document.querySelectorAll('section.site_sets')];

  if (sections.length === 0) {
    const first = createSection();
    statusElement.insertAdjacentElement('beforebegin', first);
    setHeights(first);
    return;
  }

  const last = sections[sections.length - 1];

  if (!isSectionEmpty(last)) {
    const next = createSection();
    last.insertAdjacentElement('afterend', next);
    setHeights(next);
  }
}

function ensureSectionBehaviour(section) {
  const sections = [...document.querySelectorAll('section.site_sets')];
  const isLast = sections[sections.length - 1] === section;

  if (sectionHasRule(section) && isLast) {
    const next = createSection();
    section.insertAdjacentElement('afterend', next);
    setHeights(next);
    return;
  }

  if (isSectionEmpty(section) && sections.length > 1) {
    section.remove();
    ensureTrailingEmptySection();
  }
}

function clearSections() {
  document.querySelectorAll('section.site_sets').forEach(section => {
    section.remove();
  });
}

async function restoreOptions() {
  const items = await chrome.storage.local.get(null);

  const addrs = parseStoredList(items.addrs_list);
  const csses = parseStoredList(items.slc_list);
  const jss = parseStoredList(items.fcn_list);

  clearSections();

  const count = Math.max(addrs.length, csses.length, jss.length);

  let previousSection = null;

  for (let i = 0; i < count; ++i) {
    const section = createSection([
      addrs[i] ?? '',
      csses[i] ?? '',
      jss[i] ?? ''
    ]);

    if (previousSection === null) {
      statusElement.insertAdjacentElement('beforebegin', section);
    } else {
      previousSection.insertAdjacentElement('afterend', section);
    }

    setHeights(section);
    previousSection = section;
  }

  ensureTrailingEmptySection();
}

async function saveOptions() {
  const sections = [...document.querySelectorAll('section.site_sets')];

  const addrs = [];
  const csses = [];
  const jss = [];

  for (const section of sections) {
    const values = sectionValues(section);

    if (values.url !== '' && (values.css !== '' || values.js !== '')) {
      addrs.push(values.url);
      csses.push(values.css);
      jss.push(values.js);
    }
  }

  await chrome.storage.local.set({
    addrs_list: JSON.stringify(addrs),
    slc_list: JSON.stringify(csses),
    fcn_list: JSON.stringify(jss)
  });

  setStatus('Options saved.');
}

function downloadText(filename, text) {
  const stamp = getAdjCurrDateTimeOffset(true)
    .split('T')[0]
    .split('-')
    .join('_');

  const fullFilename = `${filename}__${stamp}`;

  const anchor = document.createElement('a');
  anchor.style.display = 'none';
  document.body.appendChild(anchor);

  try {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = fullFilename;
    anchor.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      anchor.remove();
    }, 1000);
  } catch {
    anchor.href =
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    anchor.download = fullFilename;
    anchor.click();
    anchor.remove();
  }
}

function exportSettings() {
  const values = [
    ...document.querySelectorAll('section.site_sets textarea')
  ].map(textarea => textarea.value);

  const json = JSON.stringify(values);

  let payload = LZString.compressToEncodedURIComponent(json);
  
  downloadText('Code_injections', payload);
}

function parseExportedText(text) {
  const trimmed = String(text || '').trim();

    const decompressed = LZString.decompressFromEncodedURIComponent(trimmed);

    if (decompressed) {
      return JSON.parse(decompressed);
    }


  throw new Error('Unrecognised import file.');
}

function importSettings(file) {
  fileReader.onload = () => {
    try {
      const parsed = parseExportedText(fileReader.result);

      if (!Array.isArray(parsed)) {
        throw new Error('Imported data is not an array.');
      }

      const rules = [];

      for (let i = 0; i + 2 < parsed.length; i += 3) {
        rules.push([
          String(parsed[i] ?? ''),
          String(parsed[i + 1] ?? ''),
          String(parsed[i + 2] ?? '')
        ]);
      }

      clearSections();

      let previousSection = null;

      for (const rule of rules) {
        const section = createSection(rule);

        if (previousSection === null) {
          statusElement.insertAdjacentElement('beforebegin', section);
        } else {
          previousSection.insertAdjacentElement('afterend', section);
        }

        setHeights(section);
        previousSection = section;
      }

      ensureTrailingEmptySection();

      setStatus('Import complete. Remember to save.');
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }
  };

  fileReader.onerror = () => {
    alert('Import failed: could not read file.');
  };

  fileReader.readAsText(file);
}

function init() {
  saveButton.addEventListener('click', saveOptions);
  exportButton.addEventListener('click', exportSettings);

  importButton.addEventListener('input', () => {
    const file = importButton.files && importButton.files[0];

    if (file) {
      importSettings(file);
    }

    importButton.value = '';
  });

  restoreOptions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}