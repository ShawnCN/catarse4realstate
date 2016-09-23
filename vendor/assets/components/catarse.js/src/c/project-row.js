window.c.ProjectRow = (function(m){
  return {

    view: function(ctrl, args) {
      var collection = args.collection;
      return collection.collection().length > 0 ? m('.w-section.section.u-marginbottom-40', [
        m('.w-container', [
          m('.w-row.u-marginbottom-30', [
            m('.w-col.w-col-10.w-col-small-6.w-col-tiny-6', [
              m('.fontsize-large.lineheight-looser', collection.title)
            ]),
            m('.w-col.w-col-2.w-col-small-6.w-col-tiny-6', [
              m('a.btn.btn-small.btn-terciary[href="/pt/explore?ref=home_' + collection.hash + '#' + collection.hash + '"]', 'Ver todos')
            ])
          ]),
          m('.w-row', _.map(collection.collection(), function(project){
            return m.component(c.ProjectCard, {project: project});
          }))
        ])
      ]) : m('');
    }};
}(window.m));

