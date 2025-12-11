/**
 * Copyright (c) MJDG 2025.
 */

import { StackNavigationProp } from "@react-navigation/stack";
import { Component, ReactNode } from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View, Modal } from "react-native";
import { StackParamList } from "../../../navigation/StackParamList";
import ScreenContainer from "../../common/ScreenContainer";
import { RouteProp } from "@react-navigation/native";
import { images } from "../../../assets/images";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Button from "../../common/Button";
import miniGames from '../../../assets/data/mini-games.json';
// import questions from '../../../assets/data/questions.json';
import questions from '../../../assets/data/test-questions.json';


/**
 * Imports
 */

/**
 * Props
 */
interface Props {
    navigation: StackNavigationProp<StackParamList, 'Game'>;
    route: RouteProp<StackParamList, 'Game'>;
}

/**
 * State
 */
interface State {
    attempts: {
        team1: boolean[];
        team2: boolean[];
    };
    busy: boolean;
    currentQuestionIndex: number;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    isEnabled: boolean;
    revealedAnswers: boolean[];
    modalVisible: boolean;
    questionsModalVisible: boolean;
    points: {
        team1: number;
        team2: number;
    };
    pointsModalVisible: boolean;
    selectedTeam: 'team1' | 'team2';
    pointsInput: string;
}

class GameScreen extends Component<Props, State> {
    /**
   * Constructor
   *
   * @param props
   */
    constructor(props: Props) {
        console.log('GameScreen::constructor');

        super(props);

        this.state = {
            attempts: { team1: [false, false, false], team2: [false, false, false] },
            busy: true,
            currentQuestionIndex: 0,
            isEnabled: true,
            isFirstQuestion: true,
            isLastQuestion: false,
            revealedAnswers: [],
            modalVisible: false,
            questionsModalVisible: false,
            points: { team1: 0, team2: 0 },
            pointsModalVisible: false,
            selectedTeam: 'team1',
            pointsInput: ''
        };
    } // End of constructor()

    componentDidMount() {
        console.log('GameScreen::componentDidMount');

        setTimeout(() => {
            this.setState({ busy: false });
            this.initializeRevealed();
        }, 0)
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        console.log('GameScreen::componentDidUpdate');

        const { currentQuestionIndex } = this.state;
        if (prevState.currentQuestionIndex !== currentQuestionIndex) {

            this.setState({
                isFirstQuestion: currentQuestionIndex === 0,
                isLastQuestion: currentQuestionIndex === questions.length - 1
            });
        }
    }


    /**
     * Toggle Mini Games Modal
     */
    private toggleMiniGamesModal = () => {
        this.setState((prevState) => ({
            modalVisible: !prevState.modalVisible
        }));
    };

    /**
     * Toggle Questions Modal
     */
    private toggleQuestionsModal = () => {
        this.setState((prevState) => ({
            questionsModalVisible: !prevState.questionsModalVisible
        }));
    };

    /**
     * Select Question
     */
    private selectQuestion = (index: number) => {
        this.setState({
            currentQuestionIndex: index,
            questionsModalVisible: false,
            revealedAnswers: [],
            isFirstQuestion: index === 0,
            isLastQuestion: index === questions.length - 1
        });
    };

    /**
     * Add Points to Team
     */
    private addPoints = (team: 'team1' | 'team2', points: number) => {
        this.setState((prevState) => ({
            points: {
                ...prevState.points,
                [team]: prevState.points[team] + points
            }
        }));
    };

    /**
     * Toggle Points Modal
     */
    private togglePointsModal = () => {
        this.setState((prevState) => ({
            pointsModalVisible: !prevState.pointsModalVisible,
            pointsInput: ''
        }));
    };

    /**
     * Add Manual Points
     */
    private addManualPoints = () => {
        const points = parseInt(this.state.pointsInput, 10);
        if (!isNaN(points) && points > 0) {
            this.addPoints(this.state.selectedTeam, points);
            this.setState({
                pointsInput: '',
                pointsModalVisible: false
            });
        }
    };

    /**
     * Navigate to Home Screen
     */
    private navigateToHome = () => {
        console.log('GameScreen::navigateToHome');
        const { navigation } = this.props;
        navigation.navigate('Home', {});
    };

    // ======================================================================= //\n    // ===================== <<<<< Action Methods >>>>> ====================== //\n    // ======================================================================= //

    /**
     * Initialize Revealed Answers
     */
    private initializeRevealed = () => {
        console.log('GameScreen::initializeRevealed');

        const currentQuestion = questions[this.state.currentQuestionIndex];
        this.setState({ revealedAnswers: Array(currentQuestion.answers.length).fill(false) });
    };

    /**
     * Toggle Switch
     */
    private toggleSwitch = () => {
        console.log('GameScreen::toggleSwitch');

        this.setState((prevState) => ({
            isEnabled: !prevState.isEnabled
        }));
    }; // End of toggleSwitch()

    /**
     * Toggle Strike
     * 
     * @param team 
     * @param index 
     */
    private toggleStrike = (team: 'team1' | 'team2', index: number) => {
        console.log('GameScreen::toggleStrike');

        const newTeamAttempts = { ...this.state.attempts };
        const teamArray = [...newTeamAttempts[team]]; // copy the correct team array
        teamArray[index] = !teamArray[index]; // toggle the strike
        newTeamAttempts[team] = teamArray;
        this.setState({ attempts: newTeamAttempts });
    };// End of toggleStrike()

    /**
     * Reset Attempts
     */
    private resetAttempts = (team: 'team1' | 'team2') => {
        console.log('GameScreen::resetAttempts');

        this.setState((prevState) => {
            let newAttempts = { ...prevState.attempts };
            newAttempts[team] = [false, false, false];
            return { attempts: newAttempts };
        });
    };// End of resetAttempts()

    /**
     * Reset Answers
     */
    private resetAnswers = () => {
        console.log('GameScreen::resetAnswers');

        this.setState({
            revealedAnswers: []
        });
    };// End of resetAnswers()

    /**
     * Next Question
     */
    private nextQuestion = () => {
        console.log('GameScreen::nextQuestion');

        this.setState((prevState) => (
            {
                currentQuestionIndex: (prevState.currentQuestionIndex + 1) % questions.length,
                revealedAnswers: [],
            }));
    };// End of nextQuestion()

    /**
     * Previous Question
     */
    private previousQuestion = () => {
        console.log('GameScreen::previousQuestion');

        const { currentQuestionIndex } = this.state;
        this.setState((prevState) => (
            {
                currentQuestionIndex:
                    prevState.currentQuestionIndex === 0
                        ? 0
                        : prevState.currentQuestionIndex - 1,
                revealedAnswers: [],
            }));
    };// End of previousQuestion()

    /**
     * Toggle Answer
     * 
     * @param index {number}
     */
    private toggleAnswer = (index: number) => {
        console.log('GameScreen::toggleAnswer');

        const currentQuestion = questions[this.state.currentQuestionIndex];
        const newRevealed = [...this.state.revealedAnswers];

        // If revealing the answer for the first time, add points to the enabled team
        if (!newRevealed[index]) {
            const points = currentQuestion.answers[index].points;
            const team = this.state.isEnabled ? 'team1' : 'team2';
            this.addPoints(team, points);
        }

        newRevealed[index] = !newRevealed[index];
        this.setState({ revealedAnswers: newRevealed });
    };

    /**
     * Reset Points
     */
    private resetPoints = () => {
        this.setState({
            points: { team1: 0, team2: 0 }
        });
    };

    // ======================================================================= //
    // ===================== <<<<< Render Methods >>>>> ====================== //
    // ======================================================================= //

    /**
       * Render: Home Screen
       *
       * @returns ReactNode
       */
    public render(): ReactNode {
        const { attempts, busy, currentQuestionIndex, isEnabled, isFirstQuestion, isLastQuestion, revealedAnswers, modalVisible } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <ScreenContainer withImageBackground={true}>
                {busy ? (
                    <></>
                    // <Shimmer />
                ) : (
                    <View style={styles.container}>
                        {/* Header / Banner */}
                        <View style={styles.headerContainer}>
                            <View style={styles.leftContainer}>
                                <Button
                                    textStyle={styles.headerButtonText}
                                    style={styles.headerButton}
                                    title={'Games'}
                                    type={'text-only'}
                                    onPress={this.toggleMiniGamesModal}
                                />
                                <TouchableOpacity 
                                    onPress={this.togglePointsModal}
                                    style={styles.pointsButtonContainer}
                                >
                                    <Text style={styles.pointsButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerContainer}>
                                <TouchableOpacity 
                                    onLongPress={this.navigateToHome}
                                    delayLongPress={1000}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={images.barangay_feud_logo}
                                        style={styles.logoImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rightContainer}>
                                <Button
                                    textStyle={styles.headerButtonText}
                                    style={styles.headerButton}
                                    title={'Questions'}
                                    type={'text-only'}
                                    onPress={this.toggleQuestionsModal}
                                />
                            </View>
                        </View>

                        {/* Team Stats */}
                        <View style={styles.statsContainer}>
                            {/* Team 1 */}
                            <View style={styles.teamContainer}>
                                <View style={styles.infoContainer}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.teamName}>{'OG Barangay'}</Text>
                                        <Text style={styles.pointsText}>{this.state.points.team1} pts</Text>
                                    </View>
                                    <View style={styles.switchContainer}>
                                        <Switch
                                            trackColor={{ false: "light-red", true: "light-green" }}
                                            thumbColor={isEnabled ? "green" : "red"}
                                            onValueChange={this.toggleSwitch}
                                            value={isEnabled}
                                            disabled={!isEnabled}
                                        />
                                    </View>
                                </View>
                                <View style={styles.attemptsContainer}>
                                    {attempts &&
                                        attempts.team1.map((active, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => this.toggleStrike('team1', index)}
                                                style={[styles.strike, active && styles.activeStrike]}
                                                disabled={!isEnabled}
                                            >
                                                <Text style={styles.strikeText}>X</Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>
                                <Button
                                    styleText={'std'}
                                    title={'Clear'}
                                    type={'wide'}
                                    style={[styles.resetButton, !isEnabled && styles.disabled]}
                                    onPress={() => this.resetAttempts('team1')}
                                    disabled={!isEnabled}
                                />
                            </View>

                            {/* Team 2 */}
                            <View style={styles.teamContainer}>
                                <View style={styles.infoContainer}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.teamName}>{'2nd GenZ'}</Text>
                                        <Text style={styles.pointsText}>{this.state.points.team2} pts</Text>
                                    </View>
                                    <View style={styles.switchContainer}>
                                        <Switch
                                            trackColor={{ false: "light-red", true: "light-green" }}
                                            thumbColor={!isEnabled ? "green" : "red"}
                                            onValueChange={this.toggleSwitch}
                                            value={!isEnabled}
                                            disabled={isEnabled}
                                        />
                                    </View>
                                </View>
                                <View style={styles.attemptsContainer}>
                                    {attempts &&
                                        attempts.team2.map((active, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => this.toggleStrike('team2', index)}
                                                style={[styles.strike, active && styles.activeStrike]}
                                                disabled={isEnabled}
                                            >
                                                <Text style={styles.strikeText}>X</Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>
                                <Button
                                    styleText={'std'}
                                    title={'Clear'}
                                    type={'wide'}
                                    style={[styles.resetButton, isEnabled && styles.disabled]}
                                    onPress={() => this.resetAttempts('team2')}
                                    disabled={isEnabled}
                                />
                            </View>
                        </View>

                        {/* Search / Input */}
                        {/* <View style={styles.searchContainer}>
                        <View style={[styles.searchContainer, GlobalStyles.marginTopSmall]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter answer here..."
                                placeholderTextColor={'#FFD700'}
                            // value={text}
                            // onChangeText={setText}
                            />
                            <Button
                                styleText={'std'}
                                title={'Submit'}
                                type={'wide'}
                                style={styles.saveButton}
                            />
                            <Button
                                styleText={'std'}
                                title={'Reset'}
                                type={'wide'}
                                style={styles.resetButton}
                                onPress={this.reset}
                            />
                        </View>
                    </View> */}

                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                        {/* Questions & Answers */}
                        <FlatList
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            data={currentQuestion.answers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    disabled={revealedAnswers[index]}
                                    style={[
                                        styles.answerBox,
                                        revealedAnswers[index] && styles.revealedAnswerBox,
                                    ]}
                                    onPress={() => this.toggleAnswer(index)}
                                >
                                    <Text style={styles.answerText}>
                                        {revealedAnswers[index] ? `${item.label} - ${item.points} pts` : `? - ${item.points} pts`}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            // ListHeaderComponent={}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            columnWrapperStyle={{ justifyContent: 'center', marginVertical: 5 }}

                        />

                        {/* Pagination Buttons */}
                        <View style={styles.paginationContainer}>
                            <Button
                                disabled={isFirstQuestion}
                                title="Previous Question" onPress={this.previousQuestion} style={isFirstQuestion ? styles.disabled : styles.paginationButton} />
                            <Button
                                styleText={'std'}
                                title={'Reset Answers'}
                                type={'wide'}
                                style={styles.resetButton}
                                onPress={this.resetAnswers}
                            />
                            <Button
                                styleText={'std'}
                                title={'Reset Points'}
                                type={'wide'}
                                style={styles.resetButton}
                                onPress={this.resetPoints}
                            />
                            <Button title="Next Question" onPress={this.nextQuestion}
                                style={isLastQuestion ? styles.disabled : styles.paginationButton}
                                disabled={isLastQuestion}
                            />
                        </View>
                    </View>)}

                {/* Mini Games Modal */}
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={this.toggleMiniGamesModal}
                    supportedOrientations={['portrait', 'landscape', 'portrait-upside-down', 'landscape-left', 'landscape-right']}
                >
                    <TouchableOpacity 
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPress={this.toggleMiniGamesModal}
                    >
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={(e) => e.stopPropagation()}
                            style={styles.modalContent}
                        >
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select a Mini Game</Text>
                                <TouchableOpacity onPress={this.toggleMiniGamesModal}>
                                    <Text style={styles.closeButton}>✕</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={miniGames}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.gameItem}
                                        onPress={() => {
                                            console.log('Selected game:', item.name);
                                            this.toggleMiniGamesModal();
                                        }}
                                    >
                                        <Text style={styles.gameItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                {/* Questions Modal */}
                <Modal
                    visible={this.state.questionsModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={this.toggleQuestionsModal}
                    supportedOrientations={['portrait', 'landscape', 'portrait-upside-down', 'landscape-left', 'landscape-right']}
                >
                    <TouchableOpacity 
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPress={this.toggleQuestionsModal}
                    >
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={(e) => e.stopPropagation()}
                            style={styles.modalContent}
                        >
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select a Question</Text>
                                <TouchableOpacity onPress={this.toggleQuestionsModal}>
                                    <Text style={styles.closeButton}>✕</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={questions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.gameItem,
                                            this.state.currentQuestionIndex === index && styles.selectedQuestion
                                        ]}
                                        onPress={() => this.selectQuestion(index)}
                                    >
                                        <Text style={styles.gameItemText}>Question {index + 1}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                {/* Points Modal */}
                <Modal
                    visible={this.state.pointsModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={this.togglePointsModal}
                    supportedOrientations={['portrait', 'landscape', 'portrait-upside-down', 'landscape-left', 'landscape-right']}
                >
                    <TouchableOpacity 
                        style={styles.pointsModalContainer}
                        activeOpacity={1}
                        onPress={this.togglePointsModal}
                    >
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={(e) => e.stopPropagation()}
                            style={styles.pointsModalContent}
                        >
                            <View style={styles.pointsModalHeader}>
                                <Text style={styles.pointsModalTitle}>Add Points</Text>
                                <TouchableOpacity onPress={this.togglePointsModal}>
                                    <Text style={styles.closeButton}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.pointsFormContainer}>
                                <Text style={styles.pointsLabel}>Select Team</Text>
                                <View style={styles.teamSelectorContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.teamOption,
                                            this.state.selectedTeam === 'team1' && styles.selectedTeamOption
                                        ]}
                                        onPress={() => this.setState({ selectedTeam: 'team1' })}
                                    >
                                        <Text style={styles.teamOptionText}>OG Barangay</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.teamOption,
                                            this.state.selectedTeam === 'team2' && styles.selectedTeamOption
                                        ]}
                                        onPress={() => this.setState({ selectedTeam: 'team2' })}
                                    >
                                        <Text style={styles.teamOptionText}>2nd GenZ</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.pointsLabel}>Enter Points</Text>
                                <TextInput
                                    style={styles.pointsInput}
                                    placeholder="Enter points"
                                    placeholderTextColor={'#999'}
                                    keyboardType="number-pad"
                                    value={this.state.pointsInput}
                                    onChangeText={(text) => this.setState({ pointsInput: text })}
                                />

                                <Button
                                    styleText={'std'}
                                    title={'Add Points'}
                                    onPress={this.addManualPoints}
                                    style={styles.addPointsButton}
                                />
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            </ScreenContainer>

            // <ScreenContainer withImageBackground={true}
            // // style={styles.container}
            // >
            //     {/* <FlatList data={questions} renderItem={undefined}                
            //     /> */}
            //     <ScrollView showsVerticalScrollIndicator={false}
            //         contentContainerStyle={styles.container}
            //     >
            //         {/* Banner */}
            //         <View style={styles.bannerContainer}>
            //             <Image
            //                 source={images.barangay_feud_logo}
            //                 style={GlobalStyles.image}
            //                 resizeMode="contain"
            //             />
            //         </View>

            //         {/* Stats */}
            //         <View style={styles.statsContainer}>
            //             {/* Team 1 */}
            // <View style={styles.teamContainer}>
            //     <View style={styles.infoContainer}>
            //         <View style={styles.titleContainer}>
            //             <Text style={styles.teamName}>{'OG Barangay'}</Text>
            //         </View>
            //         <View style={styles.switchContainer}>
            //             <Switch
            //                 trackColor={{ false: "light-red", true: "light-green" }}
            //                 thumbColor={isEnabled ? "green" : "red"}
            //                 onValueChange={this.toggleSwitch}
            //                 value={isEnabled}
            //                 disabled={!isEnabled}
            //             />
            //         </View>
            //     </View>
            //     <View style={styles.attemptsContainer}>
            //         {attempts &&
            //             attempts.team1.map((active, index) => (
            //                 <TouchableOpacity
            //                     key={index}
            //                     onPress={() => this.toggleStrike('team1', index)}
            //                     style={[styles.strike, active && styles.activeStrike]}
            //                     disabled={!isEnabled}
            //                 >
            //                     <Text style={styles.strikeText}>X</Text>
            //                 </TouchableOpacity>
            //             ))}
            //     </View>
            // </View>

            //             {/* Team 2 */}
            // <View style={styles.teamContainer}>
            //     <View style={styles.infoContainer}>
            //         <View style={styles.titleContainer}>
            //             <Text style={styles.teamName}>{'2nd GenZ'}</Text>
            //         </View>
            //         <View style={styles.switchContainer}>
            //             <Switch
            //                 trackColor={{ false: "light-red", true: "light-green" }}
            //                 thumbColor={!isEnabled ? "green" : "red"}
            //                 onValueChange={this.toggleSwitch}
            //                 value={!isEnabled}
            //                 disabled={isEnabled}
            //             />
            //         </View>
            //     </View>
            //     <View style={styles.attemptsContainer}>
            //         {attempts &&
            //             attempts.team2.map((active, index) => (
            //                 <TouchableOpacity
            //                     key={index}
            //                     onPress={() => this.toggleStrike('team2', index)}
            //                     style={[styles.strike, active && styles.activeStrike]}
            //                     disabled={isEnabled}
            //                 >
            //                     <Text style={styles.strikeText}>X</Text>
            //                 </TouchableOpacity>
            //             ))}
            //     </View>
            // </View>
            //         </View>

            //         {/* Search */}
            //         <View style={[styles.searchContainer, GlobalStyles.marginTopSmall]}>
            //             <TextInput
            //                 style={styles.input}
            //                 placeholder="Enter answer here..."
            //                 placeholderTextColor={'#FFD700'}
            //             // value={text}
            //             // onChangeText={setText}
            //             />
            //             <Button
            //                 styleText={'std'}
            //                 title={'Submit'}
            //                 type={'wide'}
            //                 style={styles.saveButton}
            //             />
            //             <Button
            //                 styleText={'std'}
            //                 title={'Reset'}
            //                 type={'wide'}
            //                 style={styles.resetButton}
            //                 onPress={this.reset}
            //             />
            //         </View>

            //         {/* Questions and Answers */}
            //         <View style={[styles.questionsContainer, GlobalStyles.marginTop]}>
            //             <Text style={styles.questionText}>{currentQuestion.question}</Text>

            //             {currentQuestion.answers.map((answer, index) => (
            //                 <TouchableOpacity
            //                     key={index}
            //                     style={[
            //                         styles.answerBox,
            //                         revealedAnswers[index] && styles.revealedAnswerBox,
            //                     ]}
            //                     onPress={() => this.revealAnswer(index)}
            //                 >
            //                     <Text style={styles.answerText}>
            //                         {revealedAnswers[index] ? `${answer.label} - ${answer.points} pts` : `? - ${answer.points} pts`}
            //                     </Text>
            //                 </TouchableOpacity>
            //             ))}

            //             <View style={styles.paginationContainer}>
            //                 <Button title="Previous Question" onPress={this.previousQuestion} />
            //                 <Button title="Next Question" onPress={this.nextQuestion} />
            //             </View>
            //         </View>
            //     </ScrollView>
            // </ScreenContainer >

        );
    } // End of render()
}// End of class

export default GameScreen;

// ======================================================================= //
// ====================== <<<<< StyleSheets >>>>> ======================== //
// ======================================================================= //

const styles = StyleSheet.create({
    /* Containers Styles */
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    headerContainer: {
        height: 200,
        marginVertical: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        // borderWidth: 1,
        flex: 1,
        justifyContent: 'space-evenly',
        paddingVertical: 20,
        alignItems: 'center'
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    rightContainer: {
        // borderWidth: 1,
        flex: 1,
        justifyContent: 'center'
    },
    statsContainer: {
        // borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    teamContainer: {
        backgroundColor: 'rgba(200, 50, 50, 0.3)',
        borderWidth: 3,
        borderRadius: 10,
        // borderColor: 'green',
        flex: 1,
        marginHorizontal: 10,
        // height: 200,
        padding: 10,
        // alignItems: 'center',
        // width: '45%',
        // justifyContent: 'space-evenly'
        flexDirection: 'column',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleContainer: {
        // borderColor: 'blue',
        // flex: 1,
        alignItems: 'center',
        // textAlignVertical: 'center'
    },
    switchContainer: {
        padding: 10
    },
    attemptsContainer: {
        // borderWidth: 0.5,
        // borderColor: 'yellow',
        // height: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    },

    searchContainer: {
        // borderWidth: 3,
        // borderColor: 'green',
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
    },

    paginationContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        // width: '80%'
    },

    /* Text Styles */
    teamName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        padding: 10
    },
    pointsText: {
        fontSize: 14,
        color: '#FFD700',
        textAlign: 'center',
        marginTop: 5
    },

    input: {
        height: 50,
        backgroundColor: 'rgba(200, 50, 50, 0.3)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        fontSize: 25,
        color: '#FFD700',
        // flex: 1,
        width: '60%'
    },

    /* Button Styles */
    saveButton: {
        backgroundColor: 'rgb(101, 196, 102)',
    },
    resetButton: {
        backgroundColor: 'rgb(236, 91, 85)',
        width: '60%',
        alignSelf: 'center',
    },
    disabled: {
        backgroundColor: 'gray',
    },
    paginationButton: {},

    /* Strike Styles */
    strike: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    activeStrike: {
        backgroundColor: '#ff4d4d', // active = red
    },
    strikeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    questionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    questionText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        color: '#FFD700',
        backgroundColor: 'rgba(200, 50, 50, 0.3)',
        // flexShrink: 1,
        borderRadius: 10,
        marginHorizontal: 300,
        borderWidth: 1
        // color: '#8b0000'
    },
    answerText: {
        fontSize: 24,
        color: '#fff',
        marginVertical: 5
    },

    answerBox: {
        width: '40%',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: 'rgba(200, 50, 50, 0.8)',
        // backgroundColor: '#ff4d4d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    revealedAnswerBox: {
        backgroundColor: 'rgb(101, 196, 102)',
        // backgroundColor: '#006400',
    },

    /* Header Styles */
    headerButton: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: 'rgba(101, 196, 102, 0.5)',
    },
    headerButtonText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    /* Modal Styles */
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxHeight: '80%',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 50,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        flex: 1,
    },
    closeButton: {
        fontSize: 50,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    gameItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 215, 0, 0.2)',
    },
    selectedQuestion: {
        backgroundColor: 'rgba(255, 215, 0, 0.15)',
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    gameItemText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#fff',
        fontWeight: '500',
    },

    /* Points Button Styles */
    pointsButtonContainer: {
        // flex: 1,
        width: '20%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'rgba(101, 196, 102, 0.5)',
        borderColor: 'black',
    },
    pointsButton: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold',
    },

    /* Points Modal Styles */
    pointsModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    pointsModalContent: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 25,
        width: '85%',
        maxWidth: 400,
    },
    pointsModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    pointsModalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        flex: 1,
        textAlign: 'center',
    },
    pointsFormContainer: {
        gap: 20,
    },
    pointsLabel: {
        fontSize: 14,
        color: '#FFD700',
        fontWeight: '600',
        marginTop: 10,
    },
    teamSelectorContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    teamOption: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTeamOption: {
        backgroundColor: 'rgba(255, 215, 0, 0.3)',
        borderColor: '#FFD700',
    },
    teamOptionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    pointsInput: {
        backgroundColor: 'rgba(200, 50, 50, 0.3)',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#fff',
        marginTop: 8,
    },
    addPointsButton: {
        backgroundColor: 'rgb(101, 196, 102)',
        marginTop: 15,
    },
});
// End of file