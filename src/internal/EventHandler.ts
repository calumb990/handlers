//Non-API module

type _HandlerFactory = (...args: any[]) => () => void
type _HandlerRemover = (handler: () => void) => void

export { _HandlerFactory, _HandlerRemover }