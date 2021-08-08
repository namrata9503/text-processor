import { WordFrequency } from '@model/WordFrequency';

export interface WordFrequencyAnalyzer {
    calculateHighestFrequency(text: string): number;
    calculateFrequencyForWord (text: string, word: string): number;
    calculateMostFrequentNWords (text: string, n: number): WordFrequency[];
}
