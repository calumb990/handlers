declare module '@dyrektrypt/handlers' {

    interface ScaleEventConfig {
        scalePercentage: number
        scaleMin?: number
        scaleMax?: number
    }

    export function createScaleHandler(
        element: HTMLElement,
        scaleType: 'width' | 'height',
        elementConfig: ScaleEventConfig,
        fontConfig?: ScaleEventConfig
    ): () => void

    export function removeScaleHandler(handler: () => void): void

    export function createViewportHandler(
        element: HTMLElement,
        load: () => void,
        unload?: () => void,
        haltStart?: boolean
    ): () => void

    export function removeViewportHandler(handler: () => void): void
}