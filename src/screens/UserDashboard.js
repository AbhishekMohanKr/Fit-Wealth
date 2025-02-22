import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit'; 

const UserDashboard = () => {
  const userData = {
    name: "Hrithik Roshan",
    avatar: "https://img.freepik.com/premium-photo/vector-avatar-profile-icon_837074-8917.jpg", // Placeholder for avatar URL
    fitnessGoal: "Weight Loss",
    weightData: [70, 69.5, 69, 68.7, 68], 
    workoutData: [30, 45, 40, 50],
    stepsData: [5000, 7000, 8000, 6000],
    caloriesData: { consumed: 2000, burned: 2500 },
    recentMeals: [
      { name: "Chicken Salad", calories: 350, macros: { carbs: 10, proteins: 30, fats: 15 } },
      { name: "Banana Smoothie", calories: 200, macros: { carbs: 45, proteins: 3, fats: 1 } }
    ],
    workoutStreak: 5,
    goalCompletionPercentage: 80,
    rewards: [
      { title: "10,000 Steps Achievement", date: "2025-02-19" },
      { title: "5 Days Streak", date: "2025-02-20" }
    ]
  };

  return (
    <ScrollView style={[styles.container, { paddingBottom: 40 }]}>
      {/* User Profile */}
      <View style={styles.profileSection}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.fitnessGoal}>Goal: {userData.fitnessGoal}</Text>
      </View>

      {/* Progress Tracking */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progress Tracking</Text>

        {/* Weight Tracking */}
        <Text style={styles.chartTitle}>Weight Tracking (This Week)</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [{ data: userData.weightData }],
          }}
          width={Dimensions.get('window').width - 40}
          height={240}
          chartConfig={styles.chartConfig}
          style={styles.chart}
        />

        {/* Workout Progress */}
        <Text style={styles.chartTitle}>Workout Progress (This Week)</Text>
        <BarChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu"],
            datasets: [{ data: userData.workoutData }],
          }}
          width={Dimensions.get('window').width - 40}
          height={240}
          chartConfig={styles.chartConfig}
          style={styles.chart}
        />

        {/* Steps/Activity Level */}
        <Text style={styles.activityText}>Total Steps (This Week): {userData.stepsData.reduce((acc, val) => acc + val)} steps</Text>
      </View>

      {/* Calories and Nutrition */}
      <View style={styles.caloriesSection}>
        <Text style={styles.sectionTitle}>Calories & Nutrition</Text>
        <Text style={styles.activityText}>Calories Consumed: {userData.caloriesData.consumed}</Text>
        <Text style={styles.activityText}>Calories Burned: {userData.caloriesData.burned}</Text>

        {/* Macronutrient Breakdown */}
        <View style={styles.macrosContainer}>
          <Text style={styles.macroText}>Carbs: {userData.recentMeals[0].macros.carbs}g</Text>
          <Text style={styles.macroText}>Proteins: {userData.recentMeals[0].macros.proteins}g</Text>
          <Text style={styles.macroText}>Fats: {userData.recentMeals[0].macros.fats}g</Text>
        </View>

        {/* Recent Meals */}
        <FlatList
          data={userData.recentMeals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.mealCard}>
              <Text style={styles.mealText}>{item.name} - {item.calories} kcal</Text>
            </View>
          )}
        />
      </View>

      {/* Workout Stats */}
      <View style={styles.workoutStatsSection}>
        <Text style={styles.sectionTitle}>Workout Stats</Text>
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>Workout Streak: {userData.workoutStreak} days</Text>
          <Text style={styles.statsText}>Goal Completion: {userData.goalCompletionPercentage}%</Text>
        </View>
      </View>

      {/* Rewards Section */}
      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Rewards Earned</Text>
        {userData.rewards.map((reward, index) => (
          <View key={index} style={styles.rewardCard}>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardDate}>{reward.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#3e4a89',
    paddingVertical: 15,
    borderRadius: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  fitnessGoal: {
    fontSize: 16,
    color: '#fff',
  },
  progressSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  chartConfig: {
    backgroundColor: "#1e2923",
    backgroundGradientFrom: "#08130D",
    backgroundGradientTo: "#1e2923",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  },
  chart: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activityText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  caloriesSection: {
    marginBottom: 20,
  },
  macrosContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  macroText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  mealCard: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mealText: {
    fontSize: 16,
    color: '#333',
  },
  workoutStatsSection: {
    marginBottom: 20,
  },
  statsCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  rewardsSection: {
    marginTop: 20,
  },
  rewardCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  rewardDate: {
    fontSize: 14,
    color: '#777',
  },
});

export default UserDashboard;