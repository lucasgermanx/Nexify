import { BiLayer } from 'react-icons/bi';

function FeatureSection() {
  // Array de vantagens
  const features = [
    {
      title: "Sempre atualizado:",
      description: "Novas funcionalidades, melhorias e correções de bugs a todo momento. Isso é uma das vantagens que garantimos a todos vocês, novos recursos, e atualizações constantes na plataforma.",
      iconSize: 22
    },
    {
      title: "Cobranças online",
      description: "Facilite o recebimento dos pagamentos do seu negócio de maneira online e descomplicada.",
      iconSize: 24
    },
    {
      title: "Ecossistema completo",
      description: "Ecossistema completo tudo em um só lugar para todos os tipos de comércios e pessoas",
      iconSize: 22
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center justify-center" style={{ paddingTop: '2%' }}>
      {features.map((feature, index) => (
        <div key={index} className="grid grid-rows-2 items-center text-center">
          <div className="rounded-full w-10 h-10 bg-slate-900">
            <div className="pt-2">
              <BiLayer color="orange" fontSize={feature.iconSize} />
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 pt-4">
              {feature.title}
            </h3>
            <p className="font-display text-base text-slate-700">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureSection;
