import Button, { ButtonTypes } from "@/components/Button";
import { ButtonColors } from "@/constants/Colors";
import { setStatusBarBackgroundColor, StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MINUS: "-",
  EQUAL: "=",
};

const Index = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const windowWidth = useWindowDimensions().width;
  const btnWidth = (windowWidth - 5) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator == Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator == Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressOperator = (operator: string) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default:
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
    }
  };

  const onPressNumber = (number: number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: "#aaaaaa" }}></View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftArea}>
          <View style={styles.numberArea}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => {
                  onPressNumber(num);
                }}
                buttonStyle={{
                  width: btnWidth,
                  height: btnWidth,
                  marginBottom: 1,
                }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
            <Button
              title="C"
              onPress={() => onPressOperator(Operators.CLEAR)}
              buttonStyle={{
                width: btnWidth,
                height: btnWidth,
                marginBottom: 1,
              }}
              buttonType={ButtonTypes.OPERATOR}
            />
            <Button
              title="/"
              onPress={() => onPressOperator(Operators.CLEAR)}
              buttonStyle={{
                width: btnWidth,
                height: btnWidth,
                marginBottom: 1,
              }}
              buttonType={ButtonTypes.OPERATOR}
            />
            <Button
              title="*"
              onPress={() => onPressOperator(Operators.CLEAR)}
              buttonStyle={{
                width: btnWidth,
                height: btnWidth,
                marginBottom: 1,
              }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
          <View style={styles.bottomArea}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: btnWidth * 2, height: btnWidth }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title="."
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{ width: btnWidth, height: btnWidth }}
              buttonType={ButtonTypes.NUMBER}
            />
          </View>
        </View>
        <View style={styles.rightArea}>
          <Button
            title="-"
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{
              width: btnWidth,
              height: btnWidth,
              marginBottom: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="+"
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{
              width: btnWidth,
              height: btnWidth * 2 + 1,
              marginBottom: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="="
            onPress={() => onPressOperator(Operators.EQUAL)}
            buttonStyle={{
              width: btnWidth,
              height: btnWidth * 2 + 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "space-evenly",
    paddingTop: 1,
  },
  leftArea: {
    flex: 1,
    flexDirection: "column",
  },
  rightArea: {
    flexDirection: "column",
  },
  numberArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },
  bottomArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default Index;
