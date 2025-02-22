import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatScreen = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const geminiBackendURL = 'http://172.16.3.23:4000'; // Replace with actual URL
    const sendMessage = async () => {
        if (!userMessage.trim()) return;
    
        // Add user message first
        const newMessage = { text: userMessage, isUser: true };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setUserMessage('');
        setLoading(true);
    
        try {
            const response = await fetch(`${geminiBackendURL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to communicate with server');
            }
    
            const data = await response.json();
            // Wait until the user message is rendered, then add the bot's message
            const botMessage = { text: data.response, isUser: false };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error communicating with Gemini backend:', error);
            setMessages(prevMessages => [...prevMessages, { text: "Error: Unable to communicate with the server.", isUser: false }]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ask Your Queries</Text>

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
                        <Text style={[styles.messageText, item.isUser ? styles.userText : styles.botText]}>
                            {item.text}
                        </Text>
                    </View>
                )}
                
            />

            <TextInput
                style={styles.input}
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder="Type your message"
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
                <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:'#000'
    },
    messageContainer: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        marginHorizontal: 20,
    },
    userMessage: {
        backgroundColor: '#007bff',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#e5e5e5',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 22,
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: '#000',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        color:'#000'
    },
    sendButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ChatScreen;
