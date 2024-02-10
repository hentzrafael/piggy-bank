export type LoginInputProps = {
    value: string;
    onChange: (event: any) => void;
    type: "text" | "password",
    placeholder: string;
}