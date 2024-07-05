import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

const FilePicker = ({ onFilePicked }) => {
  const [fileName, setFileName] = useState('');

//   const pickDocument = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.pdf],
//       });
//       setFileName(res.name);
//       onFilePicked(res);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         throw err;
//       }
//     }
//   };

  return (
    <View>
      <Button title="Pick a PDF" 
    //   onPress={pickDocument} 
      />
      {fileName ? <Text>Picked: {fileName}</Text> : null}
    </View>
  );
};

export default FilePicker;
