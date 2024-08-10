import { useSignal } from "@preact/signals";

export default function CounterComp() {
    const counter = useSignal(0);

    console.log("rendering CounterComp");
    return (
        <>
            <p>You clicked {counter.value} times</p>
            <button onClick={() => counter.value++}>
                Click me
            </button>
        </>
    )
}