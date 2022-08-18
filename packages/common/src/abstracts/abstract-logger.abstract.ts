import { LogLevelEnum } from "src/enums";
import { Disposable } from "./disposable.abstract";
import { EventManager } from "./event-manager.abstract";

export abstract class AbstractLogger extends Disposable {
    private _level: LogLevelEnum = LogLevelEnum.INFO;
    private _eventManager = this.shouldDispose(new EventManager<LogLevelEnum>());

    public getLevel() {
        return this._level;
    }

    public setLevel(level: LogLevelEnum) {
        if (this._level === level) return;

        this._level = level;
        this._eventManager.notify(level);
    }
}
