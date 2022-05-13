import { IPlayerInfo, TCharacter } from "./src/types"

class PlayerContainer {
    private _list: { [key: string]: IPlayerInfo } = {}
    addUser(id: string) {
        this._list[id] = { id: id, character:'bee', pos: { x: 0, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, action: '' }
    }
    setUser(id:string, character:TCharacter){
        this._list[id].character=character
    }
    updateUser(id: string, data: any) {
        if(data.pos) this._list[id].pos = data.pos
        if(data.rot) this._list[id].rot = data.rot
        if(data.action) this._list[id].action = data.action
    }
    removeUser(id: string) {
        delete this._list[id]
    }

    get list() {
        return this._list
    }
    get length() {
        return Object.keys(this._list).length
    }
}

const playerContainer = new PlayerContainer()
export { playerContainer }
