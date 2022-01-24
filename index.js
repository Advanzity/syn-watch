const fetch = require('cross-fetch');
const webhook = require("webhook-discord")

const Hook = new webhook.Webhook("https://discord.com/api/webhooks/919374893634699264/SoIpy4g5ZYpsVLoSL3_X3gOlymPoQKV9M-Kk-rcm2sWyKWZvcELdNYLatII0VY2HW3W6")

function download_string(url) {
    return fetch(url).then(res => res.text());
}

function syn_watch() {
    let Curr_Version = "";
    let First_Check_Version = "";

    const VersionReturn = download_string('https://synapse.to/whitelist/version');

    First_Check_Version = VersionReturn;
    Curr_Version = VersionReturn;

    setInterval(async function() {
        const VersionReturn = await download_string('https://synapse.to/whitelist/version');
        if (VersionReturn != Curr_Version) {
            Curr_Version = VersionReturn;
            Hook.success('updater', 'Synapse updated <@everyone>')
        }
    }, 30000);
}

syn_watch()
