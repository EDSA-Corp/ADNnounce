import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';

const LoadingModal = ({ isVisible }) => {
    return (
        <Modal transparent={true} animationType="fade" visible={isVisible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    }
};

export default LoadingModal;
