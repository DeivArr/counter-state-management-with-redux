import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.contador} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick = {() => this.props.onStoreResult(this.props.contador)} > Resultado del almacenamiento </button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key = {strResult.id} onClick = {() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

//obtiene los valores del state y los convierte en props que se puedan usar 
//dentro del componente
const mapStateToProps = state => {
    return {
        contador: state.contador.counter,
        storedResults: state.storedResults.results
    };
}

//dispatch es el disparador que manda a llamar a la funcion dentro del state
const mapDispatchToProps = dispatch => {
    return {
        //increment se conecta por medio de "connect" a funcion reducer, 
        //action.type == 'INCREMENT'
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(5)),
        onStoreResult: (result) => dispatch(actionCreators.store_result(result)),
        onDeleteResult: (id) => dispatch(actionCreators.delete_result(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)