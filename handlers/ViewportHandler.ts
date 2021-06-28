import { _HandlerFactory, _HandlerRemover } from "./internal/EventHandler"


function isElementInViewport(element: HTMLElement): boolean {
    let rect = element.getBoundingClientRect()

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= innerHeight &&
        rect.right <= innerWidth
    )
}

const createViewportHandler: _HandlerFactory = (element: HTMLElement, load: () => void, unload?: () => void, haltStart: boolean = false) => {
    let prevCheck: boolean = haltStart
    let processes = 0

    let handler = () => {

        if (processes <= 10) {
            processes++

            let check = isElementInViewport(element)

            if (check !== prevCheck) {
                prevCheck = check

                if (check) {
                    load()
                } else {
                    unload && unload()
                }
            }

            processes--
        }
    }

    addEventListener('scroll', handler)
    return handler
}

const removeViewportHandler: _HandlerRemover = (handler: () => void) => {
    removeEventListener('scroll', handler)
}

export { createViewportHandler, removeViewportHandler }