import Singleton from 'singleton';

// Locals
import User from './User';

const MODELS_MAPPER = {
  User,
};

class ModelFactory extends Singleton {
  create(data, manifest) {
    if (manifest == null) return data;

    const { isArray, klass, reserved } = manifest;
    if (reserved) return data;

    const ModelClass = MODELS_MAPPER[klass || ''];
    if (ModelClass == null) throw new Error(`${klass} is undefined`);

    return isArray ? ModelClass.buildArray(data) : ModelClass.build(data);
  }
}

export default ModelFactory.get();
