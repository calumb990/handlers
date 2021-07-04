import { _HandlerFactory, _HandlerRemover } from "./internal/EventHandler";


interface ScaleEventConfig {
    scalePercentage: number
    scaleMin?: number
    scaleMax?: number
}

function calculateWidth(widthToInnerHeightPercentage: number, minPixels: number = 0, maxPixels?: number) {
    let width = Number((widthToInnerHeightPercentage / 100 * innerHeight).toFixed(4))

    return width < minPixels ? minPixels : maxPixels && width > maxPixels ? maxPixels : width
}

function calculateHeight(heightToInnerWidthPercentage: number, minPixels: number = 0, maxPixels?: number) {
    let height = Number((heightToInnerWidthPercentage / 100 * innerWidth).toFixed(4))

    return height < minPixels ? minPixels : maxPixels && height > maxPixels ? maxPixels : height
}

const createScaleHandler: _HandlerFactory = (element: HTMLElement, scaleType: 'width' | 'height', elementConfig: ScaleEventConfig, fontConfig?: ScaleEventConfig) => {

    let handler = scaleType === 'width' ? async () => {
            
        let style = (element.getAttribute('style') || '').replace(/width.*;/, '').replace(/font-size.*;/, '')
        let width = calculateWidth(elementConfig.scalePercentage, elementConfig.scaleMin, elementConfig.scaleMax)
        let fontSize = fontConfig ? 'font-size: ' + calculateWidth(fontConfig.scalePercentage, fontConfig.scaleMin, fontConfig.scaleMax) + 'px;' : ''

        element.setAttribute('style', style + ' width: ' + width + 'px; ' + fontSize)

    } : async () => {

        let style = (element.getAttribute('style') || '').replace(/height.*;/, '').replace(/font-size.*;/, '')
        let height = calculateHeight(elementConfig.scalePercentage, elementConfig.scaleMin, elementConfig.scaleMax)
        let fontSize = fontConfig ? 'font-size: ' + calculateHeight(fontConfig.scalePercentage, fontConfig.scaleMin, fontConfig.scaleMax) + 'px;' : ''

        element.setAttribute('style', style + ' height: ' + height + 'px; ' + fontSize)
    }

    addEventListener('resize', handler)
    addEventListener('load', handler)
    return handler
}

const removeScaleHandler: _HandlerRemover = (handler: () => void) => {
    removeEventListener('resize', handler)
    removeEventListener('load', handler)
}

export { createScaleHandler, removeScaleHandler }