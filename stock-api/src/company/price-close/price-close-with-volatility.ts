import { PriceClose } from "./price-close.entity";

export interface PriceCloseWithVolatility extends PriceClose {
    volatility: number; // otherwise known as fluctuation
}