import { ChangeEvent, Component } from "react";
import "./App.scss";

import Settings, { ID } from "./components/Settings";
import Length from "./components/Length";
import Result from "./components/Result";

interface StateType {
    currentText: string;
    length: number;
    options: Options;
}

interface Options {
    upperCaseEnabled?: boolean;
    lowerCaseEnabled?: boolean;
    numbersEnabled?: boolean;
    specialSymbolEnabled?: boolean;
}

class App extends Component<any, StateType> {
    state = {
        currentText: "Click Generate",
        length: 16,
        options: {
            upperCaseEnabled: true,
            lowerCaseEnabled: false,
            numbersEnabled: true,
            specialSymbolEnabled: false,
        },
    };

    getPassword = () => {
        this.setState({
            currentText: this.generatePassword(),
        });
    };

    lengthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ length: parseInt(event.target.value) });
    };

    changeHandler = (id: ID) => {
        switch (id) {
            case ID.UPPERCASE:
                this.setState((prevState, _) => {
                    return {
                        options: {
                            ...prevState.options,
                            upperCaseEnabled: !prevState.options
                                .upperCaseEnabled,
                        },
                    };
                });
                break;
            case ID.LOWERCASE:
                this.setState((prevState, _) => ({
                    options: {
                        ...prevState.options,
                        lowerCaseEnabled: !prevState.options.lowerCaseEnabled,
                    },
                }));
                break;
            case ID.NUMBER:
                this.setState((prevState, _) => ({
                    options: {
                        ...prevState.options,
                        numbersEnabled: !prevState.options.numbersEnabled,
                    },
                }));
                break;
            case ID.SPECIAL:
                this.setState((prevState, _) => ({
                    options: {
                        ...prevState.options,
                        specialSymbolEnabled: !prevState.options
                            .specialSymbolEnabled,
                    },
                }));
                break;
        }
    };

    generatePassword() {
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialCharacters = "~!@#$%^&*()_+/{}|[]\\<>,.?";

        const finalData = [];

        if (this.state.options.lowerCaseEnabled) {
            finalData.push(lowerCase);
        }

        if (this.state.options.upperCaseEnabled) {
            finalData.push(upperCase);
        }

        if (this.state.options.numbersEnabled) {
            finalData.push(numbers);
        }

        if (this.state.options.specialSymbolEnabled) {
            finalData.push(specialCharacters);
        }

        return this.generateRandom(this.state.length, finalData);
    }

    render() {
        return (
            <div>
                <Result value={this.state.currentText} />
                <Length
                    length={this.state.length}
                    onChange={this.lengthChangeHandler}
                />
                <Settings
                    lowerCaseEnabled={this.state.options.lowerCaseEnabled}
                    numbersEnabled={this.state.options.numbersEnabled}
                    upperCaseEnabled={this.state.options.upperCaseEnabled}
                    specialSymbolEnabled={
                        this.state.options.specialSymbolEnabled
                    }
                    changeHandler={(id: ID) => this.changeHandler(id)}
                />
                <button onClick={this.getPassword}>Generate password</button>
            </div>
        );
    }

    private generateRandom(count: number, data: string[]): string {
        let finalString = "";
        const finalData = data.join("");
        for (let i = 0; i < count; i++) {
            finalString += finalData.charAt(
                Math.floor(Math.random() * finalData.length)
            );
        }

        return finalString;
    }
}

export default App;
