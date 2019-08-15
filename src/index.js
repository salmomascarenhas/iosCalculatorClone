import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from './components/Button/index';
import Display from './components/Display/index';
import styles from './styles';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

export default class App extends Component {
    state = { ...initialState };

    addDigit = n => {
        // ATUALIZAÇÃO DO DISPLAY

        // Verifica se o valor atual do display é zero ou se o display pode ser limpo.
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;
        // Para não adicionar um novo ponto no display.
        if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
            return
        }
        // Se puder limpar o display, ele será limpo, caso contrário o valor atual irá receber o valor do display.
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        // Concatenamos o valor atual ao valor n.
        const displayValue = currentValue + n;
        // Atualizamos o valor do display com o valor digitado.
        this.setState({ displayValue, clearDisplay: false });
        // ATUALIZAÇÃO DOS OPERANDOS

        if (n !== '.') {
            // Guarda o valor digitado.
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            // Atualiza o valor atual mais recente para o valor do display.
            values[this.state.current] = newValue;
            this.setState({ values });
        }
    }

    clearMemory = () => {
        this.setState({ ...initialState });
    }

    setOperation = operation => {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        }
        else {
            const equals = operation === '=';
            const values = [...this.state.values];
            try {
                values[0] =
                    eval(`${values[0]} ${this.state.operation} ${values[1]}`);
            } catch (error) {
                values[0] = this.state.values[0];
            }


            values[1] = 0;
            this.setState({
                displayValue: `${values[0]}`,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Display value={this.state.displayValue} />
                <View style={styles.buttons}>
                    <Button label={'AC'} triple onClick={this.clearMemory} />
                    <Button label={'/'} operation onClick={this.setOperation} />
                    <Button label={'7'} onClick={this.addDigit} />
                    <Button label={'8'} onClick={this.addDigit} />
                    <Button label={'9'} onClick={this.addDigit} />
                    <Button label={'*'} operation onClick={this.setOperation} />
                    <Button label={'4'} onClick={this.addDigit} />
                    <Button label={'5'} onClick={this.addDigit} />
                    <Button label={'6'} onClick={this.addDigit} />
                    <Button label={'-'} operation onClick={this.setOperation} />
                    <Button label={'1'} onClick={this.addDigit} />
                    <Button label={'2'} onClick={this.addDigit} />
                    <Button label={'3'} onClick={this.addDigit} />
                    <Button label={'+'} operation onClick={this.setOperation} />
                    <Button label={'0'} double onClick={this.addDigit} />
                    <Button label={'.'} onClick={this.addDigit} />
                    <Button label={'='} operation onClick={this.setOperation} />
                </View>
            </View >
        );
    }
};