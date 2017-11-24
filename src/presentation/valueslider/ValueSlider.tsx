import * as React from 'react';
import './ValueSlider.css';
import Slider from 'material-ui/Slider';
import * as update from 'immutability-helper';

const DEFAULT_START = 0;
const DEFAULT_END = 100;

export type ValueSliderProps = {
    mainCaption: String;
    valueCaption?: String;
    start?: number;
    end?: number;
};
export interface ValueSliderState extends ValueSliderProps {
    valueCaption: String;
    start: number;
    end: number;
    value: number;
}

export default class ValueSlider extends React.Component<ValueSliderProps, ValueSliderState> {

    private rootSliderStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: ('column' as 'column'),
        alignItems: ('center' as 'center'),
        justifyContent: ('center' as 'center'),
    };
    private sliderSliderStyle = {
        marginTop: 10,
        marginBottom: 10
    };

    constructor(props: ValueSliderProps) {
        super(props);

        this.state = {
            mainCaption: props.mainCaption,
            valueCaption: props.valueCaption ? props.valueCaption : '',
            value: props.start ? props.start : DEFAULT_START,
            start: props.start ? props.start : DEFAULT_START,
            end: props.end ? props.end : DEFAULT_END
        };

        this.handleNewValue = this.handleNewValue.bind(this);
    }

    handleNewValue(_e: {}, newVal: number) {
        const newState: ValueSliderState = update(this.state, {
            value: { $set: Math.round(newVal) }
        });
        this.setState(newState);
    }

    mainCaptionPasdf(mainCaption: string) {

        let a = mainCaption
            .split('')
            .map(char => `${char}<br/>`)
            .join('');

        return (
            <p>s</p>
        );
    }

    render() {
        let formattedMainCaption = this.state.mainCaption
            .split('')
            .map((char, index) =>
                <p key={index}>{char}</p>
            );

        return (
            <div className="value-slider">
                <div className="main-caption" >
                    <p>{formattedMainCaption}</p>
                </div>
                <div className="value" >
                    <p>{this.state.value}</p>
                </div>
                <div className="value-caption" >
                    <p>{this.state.valueCaption}</p>
                </div>
                <div className="slider" >
                    <Slider
                        style={this.rootSliderStyle}
                        sliderStyle={this.sliderSliderStyle}
                        axis="y"
                        min={this.state.start}
                        max={this.state.end}
                        onChange={this.handleNewValue}
                    />
                </div>
            </div>
        );
    }

}