import type ActiveExerciseSet from "../types/activeExerciseSet";
import type { CompletedExerciseSet } from "../types/completedExerciseSet";
import type ExerciseCategoryOption from "../types/exerciseCategoryOption";
import type ExerciseSet from "../types/exerciseSet";

type DurationOptions = {
  format: ('always-hours' | 'no-hours' | 'include-hours')
}

type DurationFormat = ('long' | 'short');

const formatter = new Intl.NumberFormat('en-US');

export function msToDuration(ms: number, options?: DurationOptions): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  // Helper to pad single-digit numbers with a leading zero
  const pad = (num: number) => num.toString().padStart(2, '0');

  // Format the components
  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  if (options) {
    if (options.format === 'no-hours') {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    if (options.format === 'include-hours') {
      return hours > 0
        ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        : `${formattedMinutes}:${formattedSeconds}`;
    }
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function secondsToDuration(seconds: number, options?: DurationOptions): string {
  return msToDuration(seconds * 1000, options);
}

export function durationToSeconds(duration?: string): number {
  if (!duration) return 0;
  const [hours, minutes, seconds] = duration.split(':');
  return (Number(hours) * 60 * 60) + (Number(minutes) * 60) + Number(seconds);
}

export function formatDuration(duration?: string): string | undefined {
  if (!duration) return undefined;
  const times = duration.split(':');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (times.length === 1) {
    seconds = Number(times[0]);
  }

  if (times.length === 2) {
    minutes = Number(times[0]);
    seconds = Number(times[1]);
  }

  if (times.length === 3) {
    hours = Number(times[0]);
    minutes = Number(times[1]);
    seconds = Number(times[2]);
  }

  const hoursText = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hoursText}:${minutesText}:${secondsText}`;
}

export function durationToHhMmSs(duration?: string, options?: DurationFormat): string | undefined {
  if (!duration) return undefined;

  const [hrUnits, minUnits, secUnits] = options && options === 'short'
  ? ['h', 'm', 's']
  : [' hr', ' min', ' sec'];

  const times = duration.split(':').map(t => Number(t));

  if (times.length === 3) {
    const hours = times[0] ? `${times[0]} ${hrUnits}` : '';

    const minutes = times[1] ?
      hours ?
        times[1] < 10 ?
          `0${times[1]}${minUnits}`
          : `${times[1]}${minUnits}`
        : `${times[1]}${minUnits}`
      : '';

    const seconds = times[2] ?
      minutes ?
        times[2] < 10 ?
          `0${times[2]}${secUnits}`
          : `${times[2]}${secUnits}`
        : `${times[2]}${secUnits}`
      : '';

    return `${hours} ${minutes} ${seconds}`;
  }

  if (times.length === 2) {
    const minutes = times[0] ? `${times[0]}${minUnits}` : '';

    const seconds = times[1] ?
      minutes ?
        times[1] < 10 ?
          `0${times[1]}${secUnits}`
          : `${times[1]}${secUnits}`
        : `${times[1]}${secUnits}`
      : '';
    return `${minutes} ${seconds}`;
  }

  return times[0] ? `${times[0]}${secUnits}` : undefined;
}

export function checkPluralization(word: string, amount: number | undefined): string {
  return (amount ?? 0) === 1 ? word : word + 's';
}

export function capitalize(word: string): string {
  const letters = word.split('')
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
}

export function getShortDate(date?: string): string {
  return new Date(date ?? '')
    .toLocaleDateString(
      'en-US',
      { year: "2-digit", month: "2-digit", day: "2-digit" }
    );
}

export function chartDate(date: Date): string {
  return date.toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
}

export function daysSince(year: number, month: number, day: number): number {
  const pastDate = new Date(year, month - 1, day);
  const now = new Date();
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export function formatLargeNumber(num: number, shorten?: boolean): string {
  if (shorten) {
    if (num > 1000) {
      return formatter.format(Math.round(num / 100) / 10) + 'k';
    } else {
      return formatter.format(Math.round(num));
    }
  } else {
    return formatter.format(num);
  }
}

export function formattedTargetRepsText(set: ExerciseSet | ActiveExerciseSet): string {
  if (!set.minReps && !set.maxReps) return '';
  const repText = checkPluralization('rep', Math.max(set.minReps ?? 0, set.maxReps ?? 0));
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} ${repText}`);
}

export function formattedTargetDistanceText(set: ExerciseSet | ActiveExerciseSet): string {
  const distanceText = set.targetDistance ? `${set.targetDistance} ${checkPluralization('mile', set.targetDistance)}` : undefined;
  const durationText = durationToHhMmSs(set.targetDuration);
  return (`${distanceText ?? ""}` +
    `${distanceText && durationText ? " in " : ""}` +
    `${durationText ?? ""}`);
}

export function formattedTargetStretchText(set: ExerciseSet | ActiveExerciseSet): string {
  const repText = set.minReps ? `${set.minReps} ${checkPluralization('rep', set.minReps)}` : undefined;
  const durationText = durationToHhMmSs(set.targetDuration);
  return (`${repText ?? ""}` +
    `${repText && durationText ? " @ " : ""}` +
    `${durationText ?? ""}`);
}

export function formattedCompletedRepsText(set: ActiveExerciseSet | CompletedExerciseSet): string {
  if (!set.weight && !set.reps) return '';
  const weight = set.weight ? `${set.weight} lbs x ` : '';
  const reps = `${set.reps ?? 0} ${checkPluralization('rep', set.reps)}`
  return `${weight} ${reps}`;
}

export function formattedCompletedDistanceText(set: ActiveExerciseSet | CompletedExerciseSet): string {
  const distanceText = set.distance ? `${set.distance} ${checkPluralization('mile', set.distance)}` : undefined;
  const durationText = durationToHhMmSs(set.duration);
  return (`${distanceText ?? ""}` +
    `${distanceText && durationText ? " in " : ""}` +
    `${durationText ?? ""}`);
}

export function formattedCompletedStretchText(set: ActiveExerciseSet | CompletedExerciseSet): string {
  const repText = set.reps ? `${set.reps} ${checkPluralization('rep', set.reps)}` : undefined;
  const durationText = durationToHhMmSs(set.duration);
  return (`${repText ?? ""}` +
    `${repText && durationText ? " @ " : ""}` +
    `${durationText ?? ""}`);
}

export function formattedSetTargetsText(set: ExerciseSet | ActiveExerciseSet, category: ExerciseCategoryOption): string {
  const key = `${category.firstTargetInput}_${category.secondTargetInput}`
  switch (key) {
    case 'reps_reps': {
      return formattedTargetRepsText(set);
    }

    case 'distance_duration': {
      return formattedTargetDistanceText(set);
    }

    case 'reps_duration': {
      return formattedTargetStretchText(set);
    }

    default:
      return 'No set formatter found';
  }
}

export function formattedSetCompletedText(set: ActiveExerciseSet | CompletedExerciseSet, category: ExerciseCategoryOption): string {
  const key = `${category.firstInput}_${category.secondInput}`
  switch (key) {
    case 'weight_reps': {
      return formattedCompletedRepsText(set);
    }

    case 'distance_duration': {
      return formattedCompletedDistanceText(set);
    }

    case 'reps_duration': {
      return formattedCompletedStretchText(set);
    }

    default:
      return 'No set formatter found';
  }
}