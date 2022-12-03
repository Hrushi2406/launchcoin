import React from "react";
import { UploadImage } from "../components/UploadImage";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircle, InputField } from "../components/InputField";
import { inputInfo } from "../utils/input-info";

export function LaunchToken() {
  const [url, seturl] = React.useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(FormSchema), // Configuration the validation with the zod schema.
    defaultValues: {
      name: "",
      symbol: "",
      initialSupply: 1000,
      maxSupply: 1000,
      canMint: false,
      canBurn: false,
      isTaxable: false,
      taxFeePer: 0.0001,
      shouldBurnTax: false,
    },
  });

  const onSubmit = (data) => {
    try {
      console.log("dans onSubmit", data);
    } catch (err) {
      console.log(err);
    }
  };

  const symbol = watch().symbol;
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <UploadImage seturl={seturl} />
        <div className="grid grid-cols-8 w-full gap-x-4 ">
          <div className="info-card col-span-5 mb-4">
            <div className="flex gap-6">
              <InputField
                infoKey={"name"}
                register={register("name")}
                error={errors.name}
              />
              <InputField
                infoKey={"symbol"}
                register={register("symbol")}
                error={errors.symbol}
              />
            </div>
          </div>

          <div className="info-card col-span-3 items-center ">
            <div className="flex items-center gap-4 w-full self-center">
              <div className="rounded-full w-16 h-16 bg-gray-200">
                <img src={url} />
              </div>
              <div className="space-y-1 text-left">
                <h1 className="uppercased">{watch().symbol}</h1>

                <h6 className="text-xs ">{watch().name}</h6>
              </div>
            </div>
          </div>

          <div className="info-card col-span-5 mb-4 space-y-6">
            <InputField
              infoKey={"initialSupply"}
              register={register("initialSupply")}
              error={errors.initialSupply}
            />

            <div className="flex items-center gap-6">
              <RadioToggle
                infoKey={"canMint"}
                register={register("canMint")}
                type="checkbox"
              />
              <RadioToggle
                infoKey={"canBurn"}
                register={register("canBurn")}
                type="checkbox"
              />
            </div>

            {watch().canMint ? (
              <InputField
                infoKey={"maxSupply"}
                register={register("maxSupply")}
                error={errors.maxSupply}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="info-card col-span-3 space-y-4 justify-center justify-items-center content-center">
            <h1 className="uppercased text-gray-400 text-xs">Tokenomics</h1>

            <p className="text-xs tracking-wide text-gray-800">
              Token Initial supply will be {watch().initialSupply} {symbol}
            </p>

            {watch().canMint && (
              <p className="text-xs tracking-wide text-gray-800">
                {symbol} can be minted in future
              </p>
            )}

            {watch().canBurn && (
              <p className="text-xs tracking-wide text-gray-800">
                {symbol} can be burned by anyone who holds token
              </p>
            )}

            {watch().maxSupply && (
              <p className="text-xs tracking-wide text-gray-800">
                Max supply will be {watch().maxSupply} {symbol}
              </p>
            )}
          </div>

          <div className="info-card col-span-5 space-y-6">
            <RadioToggle
              infoKey={"isTaxable"}
              register={register("isTaxable")}
              type="checkbox"
            />

            {watch().isTaxable && (
              <InputField
                infoKey={"taxFeePer"}
                register={register("taxFeePer")}
                error={errors.taxFeePer}
              />
            )}
            {watch().isTaxable && (
              <div>
                <label className="uppercased font-medium block text-sm text-gray-600 text-left mb-2">
                  Should Tax Fee
                </label>

                <div className="flex items-center gap-6">
                  <RadioToggle
                    infoKey={"burned"}
                    register={register("shouldBurnTax")}
                    value={true}
                  />
                  <RadioToggle
                    infoKey={"treasury"}
                    register={register("shouldBurnTax")}
                    value={"false"}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="info-card col-span-3 space-y-4">
            {watch().isTaxable && (
              <>
                <h1 className="uppercased text-gray-400 text-xs">Taxable</h1>

                <p className="text-xs tracking-wide text-gray-800">
                  A fee of total {watch().taxFeePer}% will be charged per
                  transaction
                </p>

                <p className="text-xs tracking-wide text-gray-800">
                  The tax recieved will be{" "}
                  {watch().shouldBurnTax === "true"
                    ? "Burned"
                    : "added to Treasury"}
                </p>
              </>
            )}
          </div>
        </div>

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <button className="primary-btn" type="submit">
          Create Token
        </button>
      </form>
    </div>
  );
}

const FormSchema = z.object({
  name: z.string(),
  symbol: z.string().min(3).max(8),
  initialSupply: z.number().or(z.string().regex(/\d+/).transform(Number)),
  maxSupply: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .optional(),
  canMint: z.boolean(),
  canBurn: z.boolean(),
  isTaxable: z.boolean(),
  taxFeePer: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0 && n <= 100, {
      message: "Please enter a number between 0-100",
    })
    .optional(),
  shouldBurnTax: z.boolean().optional(),
});

export const RadioToggle = ({ type, infoKey, register, value }) => {
  const info = inputInfo[infoKey];

  return (
    <>
      <div className="w-full flex items-center bg-gray-50 px-4 py-2 rounded-lg justify-between">
        <div className="flex items-center gap-4">
          <input
            {...register}
            value={value ? value : undefined}
            type={info.type}
          />
          <p className="text-sm font-medium">{info.label}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="relative flex flex-col items-center group">
            <div className="">
              <InfoCircle />
            </div>
            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex w-max">
              <span className="relative z-10 p-2 text-xs text-white whitespace-no-wrap bg-black shadow-lg rounded-lg">
                {info.tooltip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
