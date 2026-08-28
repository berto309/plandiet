import {twColors} from "@/support/const";


export function initials(name: string): string {
    return name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export function greetUser(name: string): string
{
        let firstName = name.split(' ')[0]
        const hour = new Date().getHours();

        if (hour < 12) return "Good morning " + firstName + '!';
        if (hour < 18) return "Good afternoon " + firstName + '!';
        return "Good evening " + firstName + '!';
}

export function getDatePlusDay() {
    const date = new Date();

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();


        return `${dayName}, ${day} ${monthName} ${year}`;

}

export function randomTailwindColour()
{
    return twColors[Math.floor(Math.random() * twColors.length)];
}

export function formatDate(dateString:string) {
    const date = new Date(dateString);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month}, ${year}`;
}

export function enumToArray(enumItems:any) {

    return Object.entries(enumItems).map(([value, label]) => ({
        value,
        label,
    }));

}

export function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";

    // Convert to 12-hour format if you want (optional)
    // const displayHours = hours % 12 || 12;

    // Keep 24-hour format as you requested:
    const displayHours = String(hours).padStart(2, "0");

    return `${day} ${month}, ${year} ${displayHours}:${minutes}${ampm}`;
}


export function firstName(name: string): string
{
    return name.split(' ')[0]
}


export function getAge(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If birthday hasn't happened yet this year, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

export function splitRecipeStepsToArray(text: string): string[]
{
    return text.split(/\d+\.\s/).filter(Boolean);
}

export function formatFileSize(bytes: any) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getCurrentDateISO()
{
    return new Date().toISOString().split("T")[0];
}

export function sum<T>(arr: T[], key: keyof T): number {
    return arr.reduce((sum, item) => {
        const value = item[key];
            // console.log()
        // ensure value is a number before adding
        return sum + Number(value);
    }, 0);
}








