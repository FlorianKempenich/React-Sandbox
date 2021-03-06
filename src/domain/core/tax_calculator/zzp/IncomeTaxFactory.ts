import { SplineInterpolator } from '../../../../interpolation/InterpolatorImpl';
import Interpolator, { InterpolatedFunction } from '../../../interface/Interpolator';
import { IncomeTax } from '../TaxCalculator';

export default function incomeTaxFactoryZzp(interpolator: Interpolator): IncomeTax {

    const externalMapping = [
        { gross: 24000, net: 23445 },
        { gross: 25000, net: 24084 },
        { gross: 28000, net: 26002 },
        { gross: 32000, net: 28443 },
        { gross: 38000, net: 31612 },
        { gross: 42000, net: 33715 },
        { gross: 46000, net: 35817 },
        { gross: 48000, net: 36868 },
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        // TODO: Add move values for range [55000 --> 12000]
        { gross: 50000, net: 37919 },
        { gross: 55000, net: 35501 },
        { gross: 60000, net: 38129 },
        { gross: 70000, net: 43384 },
        { gross: 100000, net: 59753 },
        { gross: 120000, net: 70089 }
    ];

    const grossToNetApproximation = interpolator.guessFunction(
        externalMapping.map(grossNet => {
            return {
                x: grossNet.gross,
                y: grossNet.net
            };
        })
    );

    function incomeTax(grossYearly: number): number {
        if (grossYearly <= 24000) { return 0; }

        const fromExternalMapping =
            externalMapping
                .find((value) => value.gross === grossYearly);

        const net = fromExternalMapping ?
            fromExternalMapping.net :
            calculateInterpolatedValue(grossYearly);

        return grossYearly - net;
    }

    function calculateInterpolatedValue(grossYearly: number): number {
        return grossToNetApproximation(grossYearly);
    }

    return incomeTax;
}