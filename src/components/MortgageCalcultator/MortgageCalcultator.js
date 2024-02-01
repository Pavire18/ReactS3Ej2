import React from "react";
import "./MortgageCalcultator.css";

const MortgageCalcultator = () => {

    // Estados
    const [monthlyPayment, setMonthlyPayment] = React.useState(0);

    // Referencias a los inputs
    const houseValueRef = React.useRef();
    const savingsRef = React.useRef();
    const numYearsRef = React.useRef();
    const annualInterestRef = React.useRef();

    const getValuesAndCalculateMonthlyPayment = () => {

        const houseValue = houseValueRef.current.value;
        const savings = savingsRef.current.value;
        const annualInterest = annualInterestRef.current.value;
        const numYears = numYearsRef.current.value;

        const payment = calculateMonthPayment(houseValue, savings, annualInterest, numYears);
        setMonthlyPayment(payment);
    }

    const calculateMonthPayment = (houseValue, savings, annualInterest, numYears) => {
        const numMonths = numYears * 12;
        const annualInterestDecimal = annualInterest / 100;
        const monthlyInterest = annualInterestDecimal / 12;
        const moneyToAsk = houseValue - savings;
        const divider = (1 - Math.pow(1 + monthlyInterest, -numMonths)) / monthlyInterest;
        const monthPayment = moneyToAsk / divider;
        return monthPayment;
    }

    const formatDecimal = (num) => {
        return  (Math.round(num * 100)/100).toFixed(2);
    }

    const reduceHouseValue = () =>{
        const currentValue=parseInt(houseValueRef.current.value);
        houseValueRef.current.value=currentValue-5000;
    }

    const addHouseValue = () =>{
        const currentValue=parseInt(houseValueRef.current.value);
        houseValueRef.current.value=currentValue+5000;
    }



    const reduceSavings = () =>{
        const currentValue=parseInt(savingsRef.current.value);
        savingsRef.current.value=currentValue-1000;
    }

    const addSavings = () =>{
        const currentValue=parseInt(savingsRef.current.value);
        savingsRef.current.value=currentValue+1000;
    }


    const reduceNumYears = () =>{
        const currentValue=parseInt(numYearsRef.current.value);
        numYearsRef.current.value=currentValue-1;
    }

    const addNumYears = () =>{
        const currentValue=parseInt(numYearsRef.current.value);
        numYearsRef.current.value=currentValue+1;
    }

    const reduceAnnualInterest = () =>{
        const currentValue=parseFloat(annualInterestRef.current.value);
        annualInterestRef.current.value=formatDecimal(currentValue-0.01);
    }

    const addAnnualInterest = () =>{
        const currentValue=parseFloat(annualInterestRef.current.value);
        annualInterestRef.current.value=formatDecimal(currentValue+0.01);
    }



    return (
        <div className="mortage-calculator">
            <h2>Calculadora de hipotecas</h2>

            {/* valor de la casa */}
                <label>
                    Introduce el valor de la casa:
                </label>
                <div>
                    <button onClick={reduceHouseValue}>-</button>
                    <input ref={houseValueRef} defaultValue={300000} type="number" name="houseValue" id="houseValue" />
                    <button onClick={addHouseValue}>+</button>
                </div>

            {/* ahorros aportados */}

                <label>
                    Introduce el ahorros aportados:
                </label>
                <div>
                    <button  onClick={reduceSavings}>-</button>
                    <input ref={savingsRef} defaultValue={30000} type="number" name="savings" id="savings" />
                    <button  onClick={addSavings}>+</button>
                </div>

            {/* plazo en años */}
                <label>
                    Introduce el plazo en años:
                </label>
                <div>
                  <button onClick={reduceNumYears}>-</button>
                  <input ref={numYearsRef} defaultValue={30} type="number" name="numYears" id="numYears" />
                  <button onClick={addNumYears}>+</button>
                </div>

            {/* interés de la hipoteca (tipo fijo) */}
                <label>
                    Introduce el interés de la hipoteca (tipo fijo):
                </label>
                <div>
                    <button onClick={reduceAnnualInterest}>-</button>
                    <input ref={annualInterestRef} defaultValue={2.00} type="number" name="annualInterest" id="annualInterest" />
                    <button onClick={addAnnualInterest}>+</button>
                </div>



            <button onClick={getValuesAndCalculateMonthlyPayment}>Calcular cuota mensual</button>

            <p>Tu cuota mensual será de: <strong>{formatDecimal(monthlyPayment)} €</strong></p>
        </div>
    );

}

export default MortgageCalcultator;