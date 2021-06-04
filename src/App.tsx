/* eslint-disable react/jsx-no-undef */
import React, { useRef, useState } from "react";
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputControl from "./components/Input_Control";
import BmiControl from "./components/BMI_Control";
import BMIResult from "./components/BMI_Result";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [ error, setError] = useState('');
  const [calUnits, setCalUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightRef = useRef<HTMLIonInputElement>(null);
  const heightRef = useRef<HTMLIonInputElement>(null);

  function calculateBMI() {
    const enteredWeight = weightRef.current!.value;
    const enteredHeight = heightRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
      setError('Please enter a valid (non-negative) number!')
      return;
    }

    const heightConversion = calUnits === 'ftlbs' ? 3.28 : 1;
    const weightConversion = calUnits === 'ftlbs' ? 2.2 : 1;

    const height = +enteredHeight / heightConversion;
    const weight = +enteredWeight / weightConversion;

    //For meters and kilograms
    // const bmi = +enteredWeight  / (+enteredHeight * +enteredHeight);

    //Now this will give based on the User's selected measure
    const bmi = weight / (height * height)
    console.log(bmi)
    setCalculatedBmi(bmi);
  }

  function resetInput() {
    weightRef.current!.value = "";
    heightRef.current!.value = "";
  }

  function clearError(){
    setError('');
  }

  //We want to change Segment value based on User's selection
  function selectCalUnitHandler(selectedValue: 'mkg' | 'ftlbs'){
    setCalUnits(selectedValue);
  }

  return (
    <React.Fragment>
    <IonApp>
        <IonAlert isOpen={!!error} message={error} buttons = {[{text: 'Okay', handler: clearError}]}/> 
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle> BMI Calculator </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className='ion-padding'>
          <IonGrid>

            <IonRow>
              <IonCol>
                <InputControl selectedValue={calUnits} onSelectValue={selectCalUnitHandler}/>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Your Height ({calUnits === 'mkg' ? 'meters' : 'feet'}) </IonLabel>
                  <IonInput type="number" ref={heightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Your Weight ({calUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                  <IonInput type="number" ref={weightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControl onCalculate={calculateBMI} onReset={resetInput} />

            {calculatedBmi && (<BMIResult result={calculatedBmi} />)}
          </IonGrid>
        </IonContent>
      </IonApp>
   </React.Fragment> 
  );
};

export default App;
