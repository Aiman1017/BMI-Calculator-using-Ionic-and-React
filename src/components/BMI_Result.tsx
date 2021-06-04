import React from "react";
import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";

const BMIResult: React.FC<{ result: number }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent>
            <h2>Your BMI result is:</h2>
            <h4>{props.result.toFixed(2)}</h4>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BMIResult;