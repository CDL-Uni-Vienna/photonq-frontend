import React, {
  Component,
  ErrorInfo,
  lazy,
  PropsWithChildren,
  Suspense,
} from "react";
import { Path } from "../../model/model.routes";
const ErrorBoundaryDetail = lazy(() => import("./ErrorBoundaryDetail"));

type Props = PropsWithChildren<{}>;
type State = {
  error?: {
    raw: Error;
    info: ErrorInfo;
  };
};

/**
 * If the whole page crashes, reload after a given
 * timeout for a max number of counts. This behavior is
 * mainly targeted at fixing outdated js-chunk-errors.
 */
export default class RootErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.reload = this.reload.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error", error, "info", info);
    this.setState({ error: { raw: error, info } });
  }

  reload() {
    this.setState({ error: undefined });
    window.location.replace(Path.Login);
  }

  render() {
    if (this.state.error) {
      return (
        <Suspense fallback={""}>
          <ErrorBoundaryDetail {...this.state.error} reload={this.reload} />
        </Suspense>
      );
    }

    return this.props.children;
  }
}
