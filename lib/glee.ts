import Adapter from "./adapter";


export default class Glee {
  private _adapters: Array<{
    protocol: string,
    adapter: Adapter
  }> = []

  addAdapter(adapter: Adapter) {
    this._adapters.push({
      protocol: adapter.name(),
      adapter
    })
  }
}