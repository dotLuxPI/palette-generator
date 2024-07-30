// React & components
import Palette from './components/palette';
import TextBox from './components/textBox';
import ShortcutHint from './components/shortcut';
import Credits from './components/credits';

// CSS
import './css/global/globalLandscape.css';
import './css/global/globalPortrait.css';

import './css/palette/paletteLandscape.css';
import './css/palette/palettePortrait.css';

import './css/inputBox/inputBoxLanscape.css';
import './css/inputBox/inputBoxPortrait.css';

import './css/shortcut/shortcutLandscape.css';
import './css/shortcut/shortcutPortrait.css';

import './css/credits/creditsLandscape.css';
import './css/credits/creditsPortrait.css';

import './css/alerts/alertLandscape.css';
import './css/alerts/alertPortrait.css';



export default function App(): JSX.Element {
  return (
    <main>
      <div id='header'>
      </div>
      <div id='content'>
        <Palette />
        <TextBox />
        <ShortcutHint />
        <Credits />
      </div>
    </main>
  );
}
