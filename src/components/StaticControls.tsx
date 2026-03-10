import { FlagBR, FlagUS, Sun, Moon } from './icons'

export function StaticControls() {
  return (
    <div className="controls">
      <button
        className="lang-btn"
        id="ep-lang-btn"
        aria-label="Toggle language"
        data-tooltip="Toggle language"
      >
        <span id="ep-flag-us">
          <FlagUS />
        </span>
        <span id="ep-flag-br">
          <FlagBR />
        </span>
      </button>
      <button
        className="theme-toggle"
        id="ep-theme-btn"
        aria-label="Toggle theme"
        data-tooltip="Toggle theme"
      >
        <span id="ep-sun">
          <Sun />
        </span>
        <span id="ep-moon">
          <Moon />
        </span>
      </button>
    </div>
  )
}
