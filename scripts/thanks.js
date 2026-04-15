const getString = window.location.search;

const runnerInfo = new URLSearchParams(getString);

//Display sign up summary
document.querySelector('#results').innerHTML = `
<p>Summary for ${runnerInfo.get('name')} ${runnerInfo.get('last')}</p>
<p>Thanks for signing up. You will get</p>
<p>information about our marathon major in ${runnerInfo.get('raceSel')} via</p>
<p>the following mediums:</p>
<p>Your email: ${runnerInfo.get('eMail')}</p>
<p>Your phone: ${runnerInfo.get('phone')}</p>`