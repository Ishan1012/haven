import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

const GoogleIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: 12 }}>
        <Path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
        <Path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1205 10.2109 14.4545 9 14.4545C6.96273 14.4545 5.22182 13.0386 4.65818 11.1818H1.64727V13.5182C3.13636 16.2582 5.89091 18 9 18Z" fill="#34A853" />
        <Path d="M4.65818 11.1818C4.44909 10.5436 4.34182 9.87273 4.34182 9.18182C4.34182 8.49091 4.44909 7.81909 4.65818 7.18091V4.84455H1.64727C0.605455 6.73545 0 8.87727 0 11.1818C0 13.4864 0.605455 15.6282 1.64727 17.5191L4.65818 15.1818V11.1818Z" fill="#FBBC05" />
        <Path d="M9 3.54545C10.3218 3.54545 11.5073 4.00591 12.4382 4.88182L15.0218 2.3C13.4673 0.884091 11.43 0 9 0C5.89091 0 3.13636 1.74182 1.64727 4.48182L4.65818 6.81818C5.22182 4.96136 6.96273 3.54545 9 3.54545Z" fill="#EA4335" />
    </Svg>
);
const BookIcon = () => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></Path><Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></Path></Svg>;
const HeadphonesIcon = () => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M3 18v-6a9 9 0 0 1 18 0v6"></Path><Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2z"></Path></Svg>;
const PlayIcon = () => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polygon points="5 3 19 12 5 21 5 3"></Polygon></Svg>;
const PlantIcon = () => <Svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#A3B899" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><Path d="M12 22c-2 0-3-2-3-4s1-4 3-4 3 2 3 4-1 4-3 4z" /><Path d="M12 14V4" /><Path d="M12 4c-2.2 0-4-1.8-4-4h8c0 2.2-1.8 4-4 4z" /><Path d="M12 4c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z" /><Path d="M12 10c-2.2 0-4-1.8-4-4h8c0 2.2-1.8 4-4 4z" /></Svg>;

const SplashScreen = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        const finishTimer = setTimeout(onFinish, 2500);
        return () => clearTimeout(finishTimer);
    }, [fadeAnim, onFinish]);

    return (
        <Animated.View style={[styles.screen, styles.centerContent, { opacity: fadeAnim }]}>
            <Image
                source={require('../assets/icon.png')}
                style={styles.image}
            />
            <Text style={styles.tagline}>Your personalized path to mental wellness.</Text>
        </Animated.View>
    );
};

const LoginScreen = ({ onNext }) => (
    <View style={[styles.screen, styles.centerContent]}>
        <View style={styles.card}>
            <Text style={styles.headline}>Welcome back!</Text>
            <TextInput placeholder="Email or Phone number" style={styles.input} />
            <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
                <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.divider}>or</Text>
            <TouchableOpacity style={styles.secondaryButton}>
                <GoogleIcon />
                <Text style={styles.secondaryButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>Your journey is secure & private.</Text>
        </View>
    </View>
);

const PersonalizationScreen = ({ onNext }) => {
    const [step, setStep] = useState('language');
    const [selectedLanguages, setSelectedLanguages] = useState(['English']);
    const [selectedStyles, setSelectedStyles] = useState(['Read']);

    const toggleSelection = (item, selection, setSelection) => {
        const newSelection = selection.includes(item) ? selection.filter(i => i !== item) : [...selection, item];
        setSelection(newSelection);
    };

    return (
        <View style={[styles.screen, styles.centerContent]}>
            {step === 'language' ? (
                <View style={styles.card}>
                    <Text style={styles.headline}>Let's make this your own.</Text>
                    <Text style={styles.subtext}>Choose the languages you're comfortable with.</Text>
                    <View style={styles.tagContainer}>
                        {['English', 'Hindi', 'Bengali', 'Tamil'].map(lang => (
                            <TouchableOpacity key={lang} onPress={() => toggleSelection(lang, selectedLanguages, setSelectedLanguages)} style={selectedLanguages.includes(lang) ? styles.tagSelected : styles.tag}>
                                <Text style={selectedLanguages.includes(lang) ? styles.tagTextSelected : styles.tagText}>{lang}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('style')}>
                        <Text style={styles.primaryButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.headline}>How you prefer to engage.</Text>
                    <Text style={styles.subtext}>Select your preferred ways to receive content.</Text>
                    <View style={styles.choiceContainer}>
                        <TouchableOpacity onPress={() => toggleSelection('Read', selectedStyles, setSelectedStyles)} style={[styles.choiceCard, selectedStyles.includes('Read') && styles.choiceCardSelected]}>
                            <BookIcon /><Text style={styles.choiceText}>Read</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleSelection('Listen', selectedStyles, setSelectedStyles)} style={[styles.choiceCard, selectedStyles.includes('Listen') && styles.choiceCardSelected]}>
                            <HeadphonesIcon /><Text style={styles.choiceText}>Listen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleSelection('Watch', selectedStyles, setSelectedStyles)} style={[styles.choiceCard, selectedStyles.includes('Watch') && styles.choiceCardSelected]}>
                            <PlayIcon /><Text style={styles.choiceText}>Watch</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
                        <Text style={styles.primaryButtonText}>Continue</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>✓ Content will be available offline.</Text>
                </View>
            )}
        </View>
    );
};

const screeningQuestions = [{ text: "Little interest or pleasure in doing things?" }, { text: "Feeling down, depressed, or hopeless?" }, { text: "Feeling nervous, anxious, or on edge?" }, { text: "Not being able to stop or control worrying?" }, { text: "Feeling tired or having little energy?" },];
const answerOptions = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const ScreeningScreen = ({ onNext }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleAnswer = () => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
            if (currentIndex < screeningQuestions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else { onNext(); }
        });
    };

    const progress = ((currentIndex + 1) / screeningQuestions.length) * 100;

    return (
        <View style={[styles.screen, styles.centerContent]}>
            <View style={{ width: '80%', position: 'absolute', top: 60 }}>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]}></View>
                </View>
            </View>
            <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
                <Text style={styles.headline}>A quick check-in.</Text>
                <Text style={styles.subtext}>Your honest answers help us create the best plan for you.</Text>
                <View style={styles.questionBox}>
                    <Text style={styles.questionText}>{screeningQuestions[currentIndex].text}</Text>
                </View>
                <View style={styles.answerContainer}>
                    {answerOptions.map(opt => (
                        <TouchableOpacity key={opt} style={styles.answerButton} onPress={handleAnswer}>
                            <Text style={styles.answerButtonText}>{opt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
};

const WellnessPlanScreen = ({ onNext }) => (
    <View style={[styles.screen, styles.centerContent]}>
        <View style={{ alignItems: 'center' }}>
            <PlantIcon />
            <Text style={styles.headline}>Here's your tailored plan.</Text>
            <Text style={styles.subtext}>Based on your responses, we've created a personalized journey for you.</Text>
            <View style={[styles.tagContainer, { justifyContent: 'center', marginVertical: 20 }]}>
                <View style={styles.tagStatic}><Text style={styles.tagStaticText}>Managing Stress</Text></View>
                <View style={styles.tagStatic}><Text style={styles.tagStaticText}>Mindful Moments</Text></View>
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
                <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const OnboardingFlow = ({ onFinish }) => {
    const [step, setStep] = useState('SPLASH'); // SPLASH, LOGIN, PERSONALIZE, SCREENING, PLAN

    const renderStep = () => {
        switch (step) {
            case 'SPLASH':
                return <SplashScreen onFinish={() => setStep('LOGIN')} />;
            case 'LOGIN':
                return <LoginScreen onNext={() => setStep('PERSONALIZE')} />;
            case 'PERSONALIZE':
                return <PersonalizationScreen onNext={() => setStep('SCREENING')} />;
            case 'SCREENING':
                return <ScreeningScreen onNext={() => setStep('PLAN')} />;
            case 'PLAN':
                return <WellnessPlanScreen onNext={() => onFinish()} />;
            default:
                return <SplashScreen onFinish={() => setStep('LOGIN')} />;
        }
    };

    return <View style={styles.appContainer}>{renderStep()}</View>;
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#FBF9F6'
    },
    screen: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    tagline: {
        marginTop: 24,
        fontSize: 18,
        color: '#3C3C3C',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 27
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        maxWidth: 380,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3C3C3C',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtext: {
        fontSize: 16,
        color: '#555',
        marginBottom: 25,
        lineHeight: 24,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        color: '#333333',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#A3B899',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center'
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryButtonText: {
        color: '#3C3C3C',
        fontSize: 16,
        fontWeight: '500'
    },
    divider: {
        marginVertical: 20,
        color: '#AAA',
        fontSize: 14
    },
    footerText: {
        marginTop: 20,
        fontSize: 12,
        color: '#AAA'
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 25
    },
    tag: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: 'transparent'
    },
    tagSelected: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#A3B899',
        backgroundColor: '#A3B899'
    },
    tagText: {
        color: '#3C3C3C',
        fontSize: 14
    },
    tagTextSelected: {
        color: 'white',
        fontSize: 14
    },
    choiceContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 25,
        width: '100%'
    },
    choiceCard: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        alignItems: 'center',
        gap: 8
    },
    choiceCardSelected: {
        borderColor: '#A3B899',
        backgroundColor: '#F0F5EE'
    },
    choiceText: {
        fontSize: 12,
        color: '#3C3C3C'
    },
    progressBarBackground: {
        height: 6,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 3
    },
    progressBarFill: {
        height: 6,
        backgroundColor: '#A3B899',
        borderRadius: 3
    },
    questionBox: {
        marginVertical: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        maxWidth: 400
    },
    questionText: {
        fontSize: 18,
        color: '#3C3C3C',
        textAlign: 'center'
    },
    answerContainer: {
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 400
    },
    answerButton: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: 'white'
    },
    answerButtonText: {
        color: '#3C3C3C',
        fontSize: 16
    },
    tagStatic: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#F0F5EE',
        marginHorizontal: 5
    },
    tagStaticText: {
        color: '#59784D',
        fontSize: 14,
        fontWeight: '500'
    },
});

export default OnboardingFlow;