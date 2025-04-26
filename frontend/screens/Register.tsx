import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from 'components/CustomButton';
import LoadingModal from 'components/LoadingModal';
import { API_BASE_URL } from 'utils/config';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [org, setOrg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const logo = require('../assets/logo-2.png');

  const ipAdd = API_BASE_URL;
  const registerUser = async () => {
    try {
      const res = await axios.post(ipAdd + "register", {
        email,
        userName,
        password: pass,
        confirmPassword: confirmPass,
        organization: org
      });
      const data = res.data;
      if (data.code === 'error') {
        alert(data.message);
      } else {
        alert("Registered Successfully");
        navigation.navigate(data.redirect);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const eyeOpen = <Image source={require('../assets/eye-open.png')} style={{ width: 20, height: 20 }} />;
  const eyeClose = <Image source={require('../assets/eye-close.png')} style={{ width: 20, height: 20 }} />;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#003A6C', alignItems: 'center', paddingBottom: 20 }}>
        <Image source={logo} style={{ width: 150, height: 150, marginTop: 40 }} />

        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={userName}
          onChangeText={setUserName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />

        {/* Organization */}
        <Text style={styles.label}>Organization</Text>
        <View style={styles.input}>
          <RNPickerSelect
            onValueChange={setOrg}
            placeholder={{ label: 'Choose an organization', value: null }}
            items={[
              { label: 'COCS', value: { orgAbbr: 'COCS', orgName: 'College Of Computer Science' } },
              { label: 'ABBS', value: { orgAbbr: 'ABBS', orgName: 'Association of Bicol Business Schools' } },
              { label: 'AJMA', value: { orgAbbr: 'AJMA', orgName: 'Ateneo Junior Marketing Association' } },
            ]}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            placeholder="Enter Password"
            value={pass}
            onChangeText={setPass}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>{showPassword ? eyeClose : eyeOpen}</TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            placeholder="Confirm Password"
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>{showPassword ? eyeClose : eyeOpen}</TouchableOpacity>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingVertical: 20 }}>
        <CustomButton
          onPress={registerUser}
          title="Sign Up"
          titleColor="white"
          backgroundColor="#003A6C"
          height={50}
          width="75%"
          margin={20}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#003A6C' }}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', color: '#003A6C' }}>Sign In Here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingModal isVisible={isLoading} />
    </ScrollView>
  );
};

const styles = {
  label: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 40,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
  },
};
