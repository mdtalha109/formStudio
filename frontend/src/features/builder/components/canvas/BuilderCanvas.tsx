import { useBuilderStore } from '@adapters/store/builderStore';
import SectionNode from './SectionNode';

function BuilderCanvas() {
  const rootId = useBuilderStore((state) => state.schema.rootId);

  return (
    <div className="flex flex-col gap-4 p-6">
      <SectionNode nodeId={rootId} />
    </div>
  );
}

export default BuilderCanvas;
