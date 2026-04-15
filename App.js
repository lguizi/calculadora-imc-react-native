import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function getClassification(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau I';
  if (imc < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
}

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const camposPreenchidos = useMemo(() => peso.trim() !== '' && altura.trim() !== '', [peso, altura]);

  const calcularImc = () => {
    const pesoNumero = Number(peso.replace(',', '.'));
    const alturaNumero = Number(altura.replace(',', '.'));

    if (!pesoNumero || !alturaNumero || pesoNumero <= 0 || alturaNumero <= 0) {
      setResultado({
        valor: null,
        classificacao: 'Informe valores validos para peso e altura.',
      });
      return;
    }

    const imc = pesoNumero / (alturaNumero * alturaNumero);

    setResultado({
      valor: imc.toFixed(2),
      classificacao: getClassification(imc),
    });
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.titulo}>Calculadora de IMC</Text>
            <Text style={styles.subtitulo}>
              Informe seu peso e altura para descobrir seu indice de massa corporal.
            </Text>

            <View style={styles.campo}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex.: 72.5"
                placeholderTextColor="#8b8b8b"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex.: 1.75"
                placeholderTextColor="#8b8b8b"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />
            </View>

            <TouchableOpacity
              style={[styles.botao, !camposPreenchidos && styles.botaoDesabilitado]}
              onPress={calcularImc}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotao}>Calcular IMC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSecundario} onPress={limparCampos} activeOpacity={0.85}>
              <Text style={styles.textoBotaoSecundario}>Limpar</Text>
            </TouchableOpacity>

            {resultado && (
              <View style={styles.resultadoBox}>
                <Text style={styles.resultadoTitulo}>Resultado</Text>
                {resultado.valor ? <Text style={styles.resultadoValor}>{resultado.valor}</Text> : null}
                <Text style={styles.resultadoClassificacao}>{resultado.classificacao}</Text>
              </View>
            )}

            <View style={styles.tabela}>
              <Text style={styles.tabelaTitulo}>Classificacao do IMC</Text>
              <Text style={styles.tabelaLinha}>Menor que 18.5: Abaixo do peso</Text>
              <Text style={styles.tabelaLinha}>18.5 a 24.9: Peso normal</Text>
              <Text style={styles.tabelaLinha}>25.0 a 29.9: Sobrepeso</Text>
              <Text style={styles.tabelaLinha}>30.0 a 34.9: Obesidade grau I</Text>
              <Text style={styles.tabelaLinha}>35.0 a 39.9: Obesidade grau II</Text>
              <Text style={styles.tabelaLinha}>40.0 ou mais: Obesidade grau III</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f1ea',
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fffaf3',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1f3b4d',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 15,
    color: '#4f6472',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  campo: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c4d5f',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d4d9dd',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a1a',
  },
  botao: {
    backgroundColor: '#1f7a8c',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#1f7a8c',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoSecundario: {
    color: '#1f7a8c',
    fontSize: 16,
    fontWeight: '700',
  },
  resultadoBox: {
    marginTop: 24,
    backgroundColor: '#edf7f9',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  resultadoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#35515f',
    marginBottom: 8,
  },
  resultadoValor: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0d4f5c',
    marginBottom: 6,
  },
  resultadoClassificacao: {
    fontSize: 17,
    fontWeight: '600',
    color: '#35515f',
    textAlign: 'center',
  },
  tabela: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e2e6e9',
    paddingTop: 18,
  },
  tabelaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f3b4d',
    marginBottom: 10,
  },
  tabelaLinha: {
    fontSize: 14,
    color: '#4b5e68',
    marginBottom: 6,
  },
});
