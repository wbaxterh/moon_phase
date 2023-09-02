const express = require('express');
const moment = require('moment');
const suncalc = require('suncalc');

const app = express();

app.get('/api/moonphase', function (req, res) {
    const now = moment().toDate();
    const moonIllumination = suncalc.getMoonIllumination(now);
    console.log("moon object == ");
    console.log(moonIllumination);
    const phase = moonIllumination.phase;
    const phaseName = getPhaseName(phase);
    res.json({ 
        'moon_phase': phaseName,
        'phase_num':phase 
    });
});

function getPhaseName(phase) {
    if (phase == 0 || phase == 1) {
        return "New Moon";
    } else if (phase < 0.25) {
        return "Waxing Crescent";
    } else if (phase == 0.25) {
        return "First Quarter";
    } else if (phase < 0.5) {
        return "Waxing Gibbous";
    } else if (phase == 0.5) {
        return "Full Moon";
    } else if (phase < 0.75) {
        return "Waning Gibbous";
    } else if (phase == 0.75) {
        return "Last Quarter";
    } else {
        return "Waning Crescent";
    }
}


const PORT = 4000;
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
