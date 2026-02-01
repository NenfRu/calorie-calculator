import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorInputSchema, type CalculatorInput } from "@shared/schema";
import { calculateCalories, type CalculationResult } from "@/lib/calc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Calculator, 
  RotateCcw, 
  Activity, 
  Flame, 
  Scale, 
  TrendingDown, 
  AlertTriangle 
} from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm<CalculatorInput>({
    resolver: zodResolver(calculatorInputSchema),
    defaultValues: {
      gender: "male",
      age: 30,
      weight: 80,
      height: 175,
      activityLevel: "1.375",
      goalWeightLoss: 5,
      weeks: 12,
    },
  });

  const onSubmit = (data: CalculatorInput) => {
    const calcResult = calculateCalories(data);
    setResult(calcResult);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const onReset = () => {
    form.reset();
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 text-primary">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Калькулятор Калорий
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Рассчитайте свою персональную норму калорий и дефицит для безопасного и эффективного похудения.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-8 pt-8 px-8">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">1</span>
                  Введите ваши данные
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Заполните все поля для точного расчета
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Gender */}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-semibold text-slate-700">Пол</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Мужчина</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Женщина</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Age */}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-slate-700">Возраст (лет)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Weight */}
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-slate-700">Вес (кг)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Height */}
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-slate-700">Рост (см)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Activity Level */}
                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700">Уровень активности</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50">
                                <SelectValue placeholder="Выберите активность" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1.2">Сидячий (почти без тренировок)</SelectItem>
                              <SelectItem value="1.375">Лёгкая (1-3 раза/нед)</SelectItem>
                              <SelectItem value="1.55">Средняя (3-5 раз/нед)</SelectItem>
                              <SelectItem value="1.725">Высокая (6-7 раз/нед)</SelectItem>
                              <SelectItem value="1.9">Очень высокая / Тяжёлый труд</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 border-t border-slate-100">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white text-sm">2</span>
                        Ваша цель
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="goalWeightLoss"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Хочу сбросить (кг)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="weeks"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Срок (недель)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="flex-1 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      >
                        Рассчитать
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        onClick={onReset}
                        className="px-6 rounded-xl border-2 hover:bg-slate-50"
                      >
                        <RotateCcw className="w-5 h-5 text-slate-500" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6" id="results-section">
            {!result ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Flame className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Результаты здесь</h3>
                <p className="text-slate-400 max-w-xs">
                  Заполните форму слева и нажмите "Рассчитать", чтобы увидеть персональный план питания.
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Main Result Card */}
                <Card className="bg-slate-900 text-white border-0 shadow-2xl shadow-slate-900/20 rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-400 text-sm font-medium uppercase tracking-wider">Ваша норма</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-6xl font-black font-display tracking-tight text-white">
                        {result.targetCalories}
                      </span>
                      <span className="text-xl text-slate-400 font-medium">ккал/день</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Чтобы сбросить <span className="text-white font-bold">{form.getValues('goalWeightLoss')} кг</span> за <span className="text-white font-bold">{form.getValues('weeks')} недель</span>
                    </p>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-bold text-slate-900">{result.bmr}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">BMR (Базовый)</p>
                    </div>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <Flame className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-bold text-slate-900">{result.tdee}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">TDEE (Поддержка)</p>
                    </div>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <TrendingDown className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">-{result.kgPerWeek} кг/неделю</h4>
                        <p className="text-sm text-slate-500">Ожидаемый темп снижения веса</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Warnings */}
                {result.isUnsafe && (
                  <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-900 rounded-2xl animate-pulse">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="font-bold ml-2">Внимание: Агрессивный план!</AlertTitle>
                    <AlertDescription className="mt-2 ml-7 text-red-800/80 leading-relaxed">
                      Ваш дефицит калорий слишком велик (&gt;1000 ккал) или калораж ниже безопасного минимума. Это может навредить метаболизму. Пожалуйста, увеличьте срок диеты.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-500 leading-relaxed">
                  <p>
                    <span className="font-bold text-slate-700">Как это работает?</span> Мы используем формулу Миффлина-Сан Жеора для расчета вашего базового обмена веществ, затем корректируем его на активность и вычитаем необходимый дефицит.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
