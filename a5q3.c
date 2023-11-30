/*
    /////\\\///////\\\\\\\\\//////////\\\\\\///////\\\\\\\\\////////\\\\\\\\

    in my code in windows maching when I run: gcc a5q3_sample.c -pthread 
    I get a.exe
    so run run this is how I ran: ./a -4 -2 2

    /////\\\///////\\\\\\\\\//////////\\\\\\///////\\\\\\\\\////////\\\\\\\\

    Sample for assignment 5 question 3
    To compile:
        gcc a5q3_sample.c -pthread
    To run:
        ./a.out -4 -2 2
        0 -1 0

    Outputs may vary
*/


#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define MAX_RESOURCES 5
int available_resources = MAX_RESOURCES;

pthread_mutex_t mutex;
void *resource_thread(void *resource_request);

// Decrease available_resources by count
// Returns 0 if sufficient resources available, otherwise return -1
// EDIT THIS
int decrease_count(int count) {
    pthread_mutex_lock(&mutex);

    if (available_resources < count){
        //printf("Avalialbe Resources: %d \n",available_resources);
        pthread_mutex_unlock(&mutex);
        return -1;
    }
    else {
        available_resources -= count;
        pthread_mutex_unlock(&mutex);
        return 0;
    }
}

// Increase available_resources by count
// EDIT THIS
int increase_count(int count) {
    pthread_mutex_lock(&mutex);
    available_resources += count;
    pthread_mutex_unlock(&mutex);
    return 0;
}

// Main function that creates threads for the requests
// You probably dont need to edit this
int main(int argc, char *argv[]) {
    if (argc == 1) {
        printf("We need at least one parameter\n");  // Feedback to the user
        return 0;  // Exit, no enough parameters
    }

    // Read the requests from the command line
    int num_requests = argc - 1;
    int *requests_array = malloc(num_requests * sizeof(int));

    for (int i = 0; i < num_requests; i++) {
        int *tmp = (int *)malloc(sizeof(int));
        tmp = requests_array + i;
        *tmp = atoi(argv[i + 1]);
    }

    // Creates one thread for each request
    int num_threads = num_requests;
    pthread_t thread_id[num_threads];
    pthread_mutex_init(&mutex, NULL);

    for (int i = 0; i < num_threads; i++)
        pthread_create(&thread_id[i], NULL, resource_thread, (void *)&requests_array[i]);

    for (int i = 0; i < num_threads; i++)
        pthread_join(thread_id[i], NULL);
    
    printf("\n");
    pthread_mutex_destroy(&mutex);
    return 0;
}

// Thread that decrease (negative) or increase (positive) count based on the request
// EDIT THIS
void *resource_thread(void *resource_request) {
    // Complete the code for the thread resource allocation
    int request = *((int *)resource_request);
    int output;


    if( request < 0) {
        // printf("Thread: %d, request: %d\n",  (int) pthread_self(), request);
        output = decrease_count(-request);
    }
    
    else if( request >= 0){
        //printf("Thread: %d, request: %d\n",  (int) pthread_self(), request);
        output = increase_count(request);
    }
     
    printf("%d, ", output);
    return 0;
    
}