import React, { useEffect, useState } from "react";

import "./style.css";

const firstSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const secondSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit",
};
const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup,
};

const KeyBoardKey = ({ play, sound: { id, key, url, keyCode } }: any) => {
  const handleKeyDown = (e: any) => {
    if (e.keyCode === keyCode) {
      play(key, id);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
      <audio className="clip" id={key} src={url} />
      {key}
    </button>
  );
};

const KeyBoard: any = ({ power, play, sounds }: any) => (
  <div className="keyboard">
    {power
      ? sounds.map((sound: any) => <KeyBoardKey sound={sound} play={play} />)
      : sounds.map((sound: any) => (
          <KeyBoardKey sound={{ ...sound, url: "#" }} play={play} />
        ))}
  </div>
);

const DumControl = ({
  power,
  name,
  stop,
  volume,
  changeSoundsGroup,
  handleVolumeChange,
}: any) => (
  <div className="control">
    <button onClick={stop}>Turn the Power {power ? "OFF" : "ON"}</button>
    <h2>Volume %{Math.round(volume * 100)}</h2>
    <input
      type="range"
      max="1"
      min="0"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
    />
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundsGroup}>Change Sounds Group</button>
  </div>
);

function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName] = useState("");
  const [soundType, setSoundType] = useState("heaterKit");
  const [sounds, setSounds] = useState(
    soundsGroup[soundType as keyof typeof soundsGroup],
  );

  const stop = () => {
    setPower(!power);
  };
  const handleVolumeChange = (event: {
    target: { value: React.SetStateAction<number> };
  }) => {
    setVolume(event.target.value);
  };

  const play = (key: any, id: any) => {
    const audio = document.getElementById(key) as HTMLAudioElement | null;
    setSoundName(id);
    audio!.currentTime = 0;
    audio?.play();
  };

  const changeSoundsGroup = () => {
    setSoundName("");
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSounds(soundsGroup.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundsGroup.heaterKit);
    }
  };
  const setKeyVolume = () => {
    const audios = sounds.map(
      (sound) => document.getElementById(sound.key) as HTMLAudioElement | null,
    );
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };
  return (
    <div id="drum-machine">
      <>{setKeyVolume()}</>

      <div className="wrapper">
        <KeyBoard power={power} play={play} sounds={sounds} />
        <DumControl
          volume={volume}
          power={power}
          stop={stop}
          handleVolumeChange={handleVolumeChange}
          changeSoundsGroup={changeSoundsGroup}
          name={soundName || soundsName[soundType as keyof typeof soundsName]}
        />
      </div>
    </div>
  );
}

export default App;
